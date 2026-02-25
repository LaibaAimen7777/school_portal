import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsernameOrEmail(identifier: string) {
    return this.userRepository.findOne({
      where: [{ username: identifier }],
    });
  }

  async findAll() {
    return this.userRepository.find({
      select: ['id', 'username', 'role'],
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }
}
