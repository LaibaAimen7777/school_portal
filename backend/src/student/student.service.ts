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
      const rollNumber = schoolClass.students.length + 1;

      // Generate Username
      const yearShort = dto.joiningYear.toString().slice(2);
      const username = `${yearShort}${schoolClass.grade}${schoolClass.section}${rollNumber
        .toString()
        .padStart(2, '0')}`;

      const plainPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const user = manager.create(User, {
        username,
        password: hashedPassword,
        role: UserRole.STUDENT,
      });

      const savedUser = await manager.save(user);

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

      return {
        username,
        temporaryPassword: plainPassword,
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

      student.user.password = hashedPassword;
      student.user.must_change_password = true;

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

      const newClass = await manager.findOne(SchoolClass, {
        where: { id: newClassId },
        relations: ['students'],
      });

      if (!newClass) throw new NotFoundException('Class not found');

      if (newClass.students.length >= newClass.maxStrength)
        throw new BadRequestException('Class is full');

      // Update roll number in new class
      student.rollNumber = newClass.students.length + 1;
      student.schoolClass = newClass;

      // Update username as well
      const yearShort = student.joiningYear.toString().slice(2);
      student.user.username = `${yearShort}${newClass.grade}${newClass.section}${student.rollNumber
        .toString()
        .padStart(2, '0')}`;

      await manager.save(student.user);
      return manager.save(student);
    });
  }
}
