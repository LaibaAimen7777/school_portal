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
    return this.dataSource.transaction(async (manager) => {
      const promoted = 0;
      const graduated = 0;
      const errors: string[] = [];

      // -------------------------------------------------------
      // 1. Load all source students
      // -------------------------------------------------------

      const sourceStudentMap = new Map<number, Student[]>();

      for (const promotion of dto.promotions) {
        const students = await manager.find(Student, {
          where: {
            schoolClass: { id: promotion.fromClassId },
            isGraduated: false,
          },
          relations: ['schoolClass'],
        });

        sourceStudentMap.set(promotion.fromClassId, students);
      }

      // -------------------------------------------------------
      // 2. Calculate how many students are going into each
      //    target class
      // -------------------------------------------------------

      const incomingCounts = new Map<number, number>();

      for (const { fromClassId, toClassId } of dto.promotions) {
        if (toClassId === null) continue;

        const students = sourceStudentMap.get(fromClassId) ?? [];

        incomingCounts.set(
          toClassId,
          (incomingCounts.get(toClassId) ?? 0) + students.length,
        );
      }

      // -------------------------------------------------------
      // 3. Validate target classes and capacity
      // -------------------------------------------------------

      for (const [targetClassId, incomingCount] of incomingCounts) {
        const targetClass = await manager.findOne(SchoolClass, {
          where: { id: targetClassId },
        });

        if (!targetClass) {
          throw new BadRequestException(
            `Target class ${targetClassId} not found`,
          );
        }

        const finalStrength = targetClass.currentStrength + incomingCount;

        if (finalStrength > targetClass.maxStrength) {
          throw new BadRequestException(
            `Grade ${targetClass.grade}-${targetClass.section} ` +
              `does not have enough capacity. ` +
              `Current: ${targetClass.currentStrength}, ` +
              `Incoming: ${incomingCount}, ` +
              `Maximum: ${targetClass.maxStrength}`,
          );
        }
      }

      // -------------------------------------------------------
      // 4. Process all promotions
      // -------------------------------------------------------

      let totalPromoted = 0;
      let totalGraduated = 0;

      for (const { fromClassId, toClassId } of dto.promotions) {
        const students = sourceStudentMap.get(fromClassId) ?? [];

        if (students.length === 0) continue;

        const sourceClass = await manager.findOne(SchoolClass, {
          where: { id: fromClassId },
        });

        if (!sourceClass) {
          throw new BadRequestException(
            `Source class ${fromClassId} not found`,
          );
        }

        // ---------------------------------------------------
        // Graduation
        // ---------------------------------------------------

        if (toClassId === null) {
          for (const student of students) {
            student.isGraduated = true;
            student.graduatedAt = new Date();
            student.schoolClass = null;
          }

          await manager.save(Student, students);

          sourceClass.currentStrength = 0;
          await manager.save(SchoolClass, sourceClass);

          totalGraduated += students.length;

          continue;
        }

        // ---------------------------------------------------
        // Promotion
        // ---------------------------------------------------

        const targetClass = await manager.findOne(SchoolClass, {
          where: { id: toClassId },
        });

        if (!targetClass) {
          throw new BadRequestException(`Target class ${toClassId} not found`);
        }

        const lastStudent = await manager.findOne(Student, {
          where: {
            schoolClass: { id: targetClass.id },
            isGraduated: false,
          },
          order: {
            rollNumber: 'DESC',
          },
        });

        let nextRollNumber = lastStudent?.rollNumber
          ? lastStudent.rollNumber + 1
          : 1;

        for (const student of students) {
          student.schoolClass = targetClass;
          student.rollNumber = nextRollNumber++;

          await manager.save(Student, student);
        }

        sourceClass.currentStrength = 0;

        targetClass.currentStrength += students.length;

        await manager.save(SchoolClass, sourceClass);
        await manager.save(SchoolClass, targetClass);

        totalPromoted += students.length;
      }

      return {
        promoted: totalPromoted,
        graduated: totalGraduated,
        errors,
      };
    });
  }
}
