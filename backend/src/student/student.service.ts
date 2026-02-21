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

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private dataSource: DataSource,
  ) {}

  async findAll(grade?: number, section?: string) {
    const query = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('student.schoolClass', 'schoolClass');

    if (grade) query.andWhere('schoolClass.grade = :grade', { grade });
    if (section) query.andWhere('schoolClass.section = :section', { section });
    console.log('query in ss', query);

    return query.getMany();
  }

  async create(dto: CreateStudentDto) {
    return this.dataSource.transaction(async (manager) => {
      console.log('here in ss in b');
      const schoolClass = await manager.findOne(SchoolClass, {
        where: { id: dto.classId },
        relations: ['students'],
      });

      if (!schoolClass) {
        throw new NotFoundException('Class not found');
      }

      if (schoolClass.students.length >= schoolClass.maxStrength) {
        throw new BadRequestException('Class is full');
      }

      // Generate Roll Number
      const lastStudent = await manager.findOne(Student, {
        where: { schoolClass: { id: schoolClass.id } },
        order: { rollNumber: 'DESC' },
      });

      const rollNumber = lastStudent ? lastStudent.rollNumber + 1 : 1;

      let savedUser: User | null = null;
      let username: string | null = null;
      let plainPassword: string | null = null;

      if (schoolClass.grade >= 9) {
        const yearShort = dto.joiningYear.toString().slice(2);
        username = `${yearShort}${schoolClass.grade}${schoolClass.section}${rollNumber
          .toString()
          .padStart(2, '0')}`;

        plainPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const user = manager.create(User, {
          username,
          password: hashedPassword,
          role: UserRole.STUDENT,
        });

        savedUser = await manager.save(user);
      }

      // Check if parent exists
      let parent = await manager.findOne(Parent, {
        where: { phone: dto.phone },
      });

      if (!parent) {
        parent = manager.create(Parent, {
          fatherName: dto.fatherName,
          motherName: dto.motherName,
          phone: dto.phone,
          email: dto.email,
          address: dto.address,
        });

        parent = await manager.save(parent);
      }

      const student = manager.create(Student, {
        firstName: dto.firstName,
        lastName: dto.lastName,
        dateOfBirth: dto.dateOfBirth,
        gender: dto.gender,
        rollNumber,
        joiningYear: dto.joiningYear,
        schoolClass,
        user: savedUser || null,
        parent: parent,
      });

      await manager.save(student);

      schoolClass.currentStrength += 1;
      await manager.save(schoolClass);

      return {
        studentId: student.id,
        grade: schoolClass.grade,
        section: schoolClass.section,
        rollNumber,
        username: username ?? null,
        temporaryPassword: plainPassword ?? null,
      };
    });
  }

  async resetPassword(studentId: number) {
    return this.dataSource.transaction(async (manager) => {
      const student = await manager.findOne(Student, {
        where: { id: studentId },
        relations: ['user'],
      });

      if (!student) {
        throw new NotFoundException('Student not found');
      }

      const newPassword = crypto.randomBytes(8).toString('hex');
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      if (student.user) {
        student.user.password = hashedPassword;
        student.user.must_change_password = true;
      }

      await manager.save(student.user);

      return {
        message: 'Password reset successfully',
        temporaryPassword: newPassword,
      };
    });
  }

  async updateClass(studentId: number, newClassId: number) {
    return this.dataSource.transaction(async (manager) => {
      const student = await manager.findOne(Student, {
        where: { id: studentId },
        relations: ['schoolClass', 'user'],
      });

      if (!student) throw new NotFoundException('Student not found');

      const oldClass = student.schoolClass;

      const newClass = await manager.findOne(SchoolClass, {
        where: { id: newClassId },
      });

      if (!newClass) throw new NotFoundException('Class not found');

      if (newClass.currentStrength >= newClass.maxStrength)
        throw new BadRequestException('Class is full');

      // 🔁 Decrease old class strength
      oldClass.currentStrength -= 1;
      await manager.save(oldClass);

      // 🔢 Generate new roll number safely
      const lastStudent = await manager.findOne(Student, {
        where: { schoolClass: { id: newClass.id } },
        order: { rollNumber: 'DESC' },
      });

      const newRollNumber = lastStudent ? lastStudent.rollNumber + 1 : 1;

      // Update student
      student.rollNumber = newRollNumber;
      student.schoolClass = newClass;

      // 🧠 Handle portal logic
      const yearShort = student.joiningYear.toString().slice(2);

      // Case 1: Student moves into Grade 9 or 10 and has NO account
      if (newClass.grade >= 9 && !student.user) {
        const plainPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const username = `${yearShort}${newClass.grade}${newClass.section}${newRollNumber
          .toString()
          .padStart(2, '0')}`;

        const user = manager.create(User, {
          username,
          password: hashedPassword,
          role: UserRole.STUDENT,
        });

        student.user = await manager.save(user);
      }

      // Case 2: Student already has portal → just update username
      if (student.user) {
        student.user.username = `${yearShort}${newClass.grade}${newClass.section}${newRollNumber
          .toString()
          .padStart(2, '0')}`;

        await manager.save(student.user);
      }

      // 🔁 Increase new class strength
      newClass.currentStrength += 1;
      await manager.save(newClass);

      return manager.save(student);
    });
  }
}
