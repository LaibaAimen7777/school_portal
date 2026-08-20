import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Parent } from 'src/parent/entities/parent.entity';
import { Repository, DataSource } from 'typeorm';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { User, UserRole } from 'src/users/entities/user.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { BulkPromoteDto } from './dto/bulk-promote.dto';

function generatePassword() {
  return crypto.randomBytes(8).toString('hex');
}

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(SchoolClass)
    private classRepository: Repository<SchoolClass>,

    private dataSource: DataSource,
  ) {}

  async findAll(grade?: number, section?: string) {
    const query = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.schoolClass', 'schoolClass')
      .leftJoinAndSelect('student.parent', 'parent')
      .where('student.isGraduated = false'); // exclude graduated students from active list

    if (grade) query.andWhere('schoolClass.grade = :grade', { grade });
    if (section) query.andWhere('schoolClass.section = :section', { section });

    return query.getMany();
  }

  async create(dto: CreateStudentDto) {
    return this.dataSource.transaction(async (manager) => {
      const schoolClass = await manager.findOne(SchoolClass, {
        where: { id: dto.classId },
      });

      if (!schoolClass) throw new NotFoundException('Class not found');

      if (schoolClass.currentStrength >= schoolClass.maxStrength) {
        throw new BadRequestException('Class is full');
      }

      const lastStudent = await manager.findOne(Student, {
        where: { schoolClass: { id: schoolClass.id } },
        order: { rollNumber: 'DESC' },
      });
      const rollNumber = lastStudent ? lastStudent.rollNumber + 1 : 1;

      let parent = await manager.findOne(Parent, {
        where: { phone: dto.phone },
        relations: ['user'],
      });

      let parentPlainPassword: string | null = null;

      if (!parent) {
        const parentUsername = dto.phone;
        parentPlainPassword = generatePassword();
        const parentHashedPassword = await bcrypt.hash(parentPlainPassword, 10);

        const parentUser = manager.create(User, {
          username: parentUsername,
          password: parentHashedPassword,
          role: UserRole.PARENT,
          canLogin: 1,
          mustChangePassword: 1,
          isActive: 1,
        });

        const savedParentUser = await manager.save(parentUser);

        parent = manager.create(Parent, {
          fatherName: dto.fatherName,
          motherName: dto.motherName,
          phone: dto.phone,
          email: dto.email,
          address: dto.address,
          user: savedParentUser,
        });

        parent = await manager.save(parent);
      } else {
        if (!parent.user) {
          const parentUsername = parent.phone;
          parentPlainPassword = generatePassword();
          const parentHashedPassword = await bcrypt.hash(
            parentPlainPassword,
            10,
          );

          const parentUser = manager.create(User, {
            username: parentUsername,
            password: parentHashedPassword,
            role: UserRole.PARENT,
            canLogin: 1,
            mustChangePassword: 1,
            isActive: 1,
          });

          const savedParentUser = await manager.save(parentUser);
          parent.user = savedParentUser;
          await manager.save(parent);
        }
      }

      const student = manager.create(Student, {
        firstName: dto.firstName,
        lastName: dto.lastName,
        dateOfBirth: dto.dateOfBirth,
        gender: dto.gender,
        rollNumber,
        joiningYear: dto.joiningYear,
        schoolClass,
        parent,
      });

      const savedStudent = await manager.save(student);

      schoolClass.currentStrength += 1;
      await manager.save(schoolClass);

      return {
        studentId: savedStudent.id,
        grade: schoolClass.grade,
        section: schoolClass.section,
        rollNumber,
        parentUsername: parent?.user?.username || null,
        parentPassword: parentPlainPassword,
      };
    });
  }

  async updateClass(studentId: number, newClassId: number) {
    return this.dataSource.transaction(async (manager) => {
      const student = await manager.findOne(Student, {
        where: { id: studentId },
        relations: ['schoolClass'],
      });

      if (!student) throw new NotFoundException('Student not found');

      const oldClass = student.schoolClass;

      if (!oldClass) {
        throw new BadRequestException(
          'Student is not currently assigned to a class',
        );
      }

      const newClass = await manager.findOne(SchoolClass, {
        where: { id: newClassId },
      });

      if (!newClass) throw new NotFoundException('Class not found');

      if (newClass.currentStrength >= newClass.maxStrength) {
        throw new BadRequestException('Class is full');
      }

      oldClass.currentStrength -= 1;
      await manager.save(oldClass);

      const lastStudent = await manager.findOne(Student, {
        where: { schoolClass: { id: newClass.id } },
        order: { rollNumber: 'DESC' },
      });

      const newRollNumber = lastStudent ? lastStudent.rollNumber + 1 : 1;

      student.rollNumber = newRollNumber;
      student.schoolClass = newClass;

      newClass.currentStrength += 1;
      await manager.save(newClass);

      return manager.save(student);
    });
  }

  async bulkPromote(dto: BulkPromoteDto) {
    const results: {
      promoted: number;
      graduated: number;
      errors: string[];
    } = { promoted: 0, graduated: 0, errors: [] };

    for (const { fromClassId, toClassId } of dto.promotions) {
      try {
        await this.dataSource.transaction(async (manager) => {
          // Load all active students in the source class
          const students = await manager.find(Student, {
            where: { schoolClass: { id: fromClassId }, isGraduated: false },
            relations: ['schoolClass'],
          });

          if (students.length === 0) return;

          const sourceClass = await manager.findOne(SchoolClass, {
            where: { id: fromClassId },
          });

          if (toClassId === null) {
            // ── Graduate ────────────────────────────────────────────────────
            for (const student of students) {
              student.isGraduated = true;
              student.graduatedAt = new Date();
              student.schoolClass = null as any; // detach from class
            }

            await manager.save(students);

            // Zero out the source class strength
            if (sourceClass) {
              sourceClass.currentStrength = Math.max(
                0,
                sourceClass.currentStrength - students.length,
              );
              await manager.save(sourceClass);
            }

            results.graduated += students.length;
          } else {
            // ── Promote ─────────────────────────────────────────────────────
            const targetClass = await manager.findOne(SchoolClass, {
              where: { id: toClassId },
            });

            if (!targetClass) {
              results.errors.push(
                `Target class ${toClassId} not found — skipping Grade source class ${fromClassId}`,
              );
              return;
            }

            // Get the current highest roll number in the target class so we
            // don't collide with students already in it
            const lastInTarget = await manager.findOne(Student, {
              where: { schoolClass: { id: toClassId }, isGraduated: false },
              order: { rollNumber: 'DESC' },
            });

            let nextRoll = lastInTarget ? lastInTarget.rollNumber + 1 : 1;

            for (const student of students) {
              student.schoolClass = targetClass;
              student.rollNumber = nextRoll++;
            }

            await manager.save(students);

            // Update strengths on both classes
            if (sourceClass) {
              sourceClass.currentStrength = Math.max(
                0,
                sourceClass.currentStrength - students.length,
              );
              await manager.save(sourceClass);
            }

            targetClass.currentStrength += students.length;
            await manager.save(targetClass);

            results.promoted += students.length;
          }
        });
      } catch (err: any) {
        results.errors.push(
          `Failed to process class ${fromClassId}: ${err.message}`,
        );
      }
    }

    return results;
  }
}
