import { Module } from '@nestjs/common';
import { SchoolClassController } from './school-class.controller';
import { SchoolClassService } from './school-class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './entities/school-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolClass])],
  controllers: [SchoolClassController],
  providers: [SchoolClassService],
  exports: [TypeOrmModule],
})
export class SchoolClassModule {}
