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
// import { Mark } from 'src/marks/entities/marks.entity';

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

    // @InjectRepository(User)
    // private userRepository: Repository<User>,

    private dataSource: DataSource,
  ) {}

  async findAll(grade?: number, section?: string) {
    const query = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.schoolClass', 'schoolClass')
      .leftJoinAndSelect('student.parent', 'parent');

    if (grade) query.andWhere('schoolClass.grade = :grade', { grade });
    if (section) query.andWhere('schoolClass.section = :section', { section });
    console.log('query in ss', query);

    return query.getMany();
  }

  async create(dto: CreateStudentDto) {
    return this.dataSource.transaction(async (manager) => {
      // 1️⃣ Find the class
      const schoolClass = await manager.findOne(SchoolClass, {
        where: { id: dto.classId },
      });

      if (!schoolClass) {
        throw new NotFoundException('Class not found');
      }

      if (schoolClass.currentStrength >= schoolClass.maxStrength) {
        throw new BadRequestException('Class is full');
      }

      console.log('school class:', schoolClass);

      // 2️⃣ Generate roll number
      const lastStudent = await manager.findOne(Student, {
        where: { schoolClass: { id: schoolClass.id } },
        order: { rollNumber: 'DESC' },
      });
      const rollNumber = lastStudent ? lastStudent.rollNumber + 1 : 1;

      // let savedUser: User | null = null;
      // let username: string | null = null;
      // let plainPassword: string | null = null;
      // let canLogin = false;

      // if (schoolClass.grade >= 9) {
      //   // 3️⃣ Prepare username/password
      //   const yearShort = dto.joiningYear.toString().slice(2);
      //   username = `${yearShort}${schoolClass.grade}${schoolClass.section}${rollNumber
      //     .toString()
      //     .padStart(2, '0')}`;

      //   plainPassword = generatePassword();
      //   const hashedPassword = await bcrypt.hash(plainPassword, 10);
      //   canLogin = true;

      //   const user = manager.create(User, {
      //     username,
      //     password: hashedPassword,
      //     role: UserRole.STUDENT,
      //     canLogin: 1,
      //     mustChangePassword: 1,
      //     isActive: 1,
      //   });

      //   savedUser = await manager.save(user);
      // }

      let parent = await manager.findOne(Parent, {
        where: { phone: dto.phone },
        relations: ['user'],
      });

      let parentPlainPassword: string | null = null;

      if (!parent) {
        // Create parent user
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

        // Create parent
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
        // Parent exists but may not have user
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
      // 6️⃣ Create student using classId directly
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

      // 7️⃣ Update class current strength
      schoolClass.currentStrength += 1;
      await manager.save(schoolClass);

      // 8️⃣ Return created info
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
  // async resetPassword(studentId: number) {
  //   return this.dataSource.transaction(async (manager) => {
  //     const student = await manager.findOne(Student, {
  //       where: { id: studentId },
  //       relations: ['user'],
  //     });

  //     if (!student) {
  //       throw new NotFoundException('Student not found');
  //     }

  //     const newPassword = crypto.randomBytes(8).toString('hex');
  //     const hashedPassword = await bcrypt.hash(newPassword, 10);

  //     if (student.user) {
  //       student.user.password = hashedPassword;
  //       student.user.must_change_password = true;
  //     }

  //     await manager.save(student.user);

  //     return {
  //       message: 'Password reset successfully',
  //       temporaryPassword: newPassword,
  //     };
  //   });
  // }

  async updateClass(studentId: number, newClassId: number) {
    return this.dataSource.transaction(async (manager) => {
      const student = await manager.findOne(Student, {
        where: { id: studentId },
        relations: ['schoolClass'],
      });

      if (!student) throw new NotFoundException('Student not found');

      const oldClass = student.schoolClass;

      const newClass = await manager.findOne(SchoolClass, {
        where: { id: newClassId },
      });

      if (!newClass) throw new NotFoundException('Class not found');

      if (newClass.currentStrength >= newClass.maxStrength) {
        throw new BadRequestException('Class is full');
      }

      // 🔁 Decrease old class strength
      oldClass.currentStrength -= 1;
      await manager.save(oldClass);

      // 🔢 Generate new roll number
      const lastStudent = await manager.findOne(Student, {
        where: { schoolClass: { id: newClass.id } },
        order: { rollNumber: 'DESC' },
      });

      const newRollNumber = lastStudent ? lastStudent.rollNumber + 1 : 1;

      // ✅ Update student
      student.rollNumber = newRollNumber;
      student.schoolClass = newClass;

      // 🔁 Increase new class strength
      newClass.currentStrength += 1;
      await manager.save(newClass);

      return manager.save(student);
    });
  }

async bulkPromote(dto: BulkPromoteDto) {
  const results = { promoted: 0, graduated: 0, errors: string[] = [] };

  for (const { fromClassId, toClassId } of dto.promotions) {
    const students = await this.studentRepo.find({
      where: { schoolClass: { id: fromClassId } },
    });

    if (toClassId === null) {
      // mark as graduated — adjust to your own alumni/archive logic
      await this.studentRepo.update(
        { schoolClass: { id: fromClassId } },
        { isGraduated: true, schoolClass: null },
      );
      results.graduated += students.length;
    } else {
      const targetClass = await this.classRepo.findOne({ where: { id: toClassId } });
      if (!targetClass) { results.errors.push(`Class ${toClassId} not found`); continue; }

      await this.studentRepo.update(
        { schoolClass: { id: fromClassId } },
        { schoolClass: targetClass },
      );
      results.promoted += students.length;
    }
  }

  return results;
}

  // async getResults(studentId: number) {
  //   const marks = await this.marksRepo.find({
  //     where: {
  //       student: { id: studentId },
  //     },
  //     relations: ['exam', 'exam.subject', 'exam.schoolClass'],
  //   });

  //   return marks.map((m) => ({
  //     subject: m.exam.subject.name,
  //     examType: m.exam.examType,
  //     score: m.score,
  //     date: m.exam.date,
  //   }));
  // }

  // async getMyProfile(userId: number) {
  //   const student = await this.studentRepository.findOne({
  //     where: {
  //       user: { id: userId },
  //     },
  //     relations: ['schoolClass', 'parent'],
  //   });

  //   if (!student) {
  //     throw new NotFoundException('Student not found');
  //   }

  //   return {
  //     id: student.id,
  //     firstName: student.firstName,
  //     lastName: student.lastName,
  //     rollNumber: student.rollNumber,
  //     grade: student.schoolClass.grade,
  //     section: student.schoolClass.section,
  //     joiningYear: student.joiningYear,

  //     parent: {
  //       fatherName: student.parent?.fatherName,
  //       motherName: student.parent?.motherName,
  //       phone: student.parent?.phone,
  //     },
  //   };
  // }
}
