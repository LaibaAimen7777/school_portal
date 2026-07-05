import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropExtraTable1783253930118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('marks');
    await queryRunner.dropTable('submissions');

    await queryRunner.dropTable('exam');
    await queryRunner.dropTable('assignments');

    await queryRunner.dropTable('exam_period');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE exam_period (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                startDate DATE,
                endDate DATE,
                isActive TINYINT,
                examType ENUM('FIRST TERM','SECOND TERM','THIRD TERM'),
                durationMinutes INT
            )
        `);

    await queryRunner.query(`
            CREATE TABLE assignments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                description VARCHAR(255),
                dueDate DATE,
                teacherId INT,
                subjectId INT,
                schoolClassId INT
            )
        `);

    await queryRunner.query(`
            CREATE TABLE exam (
                id INT AUTO_INCREMENT PRIMARY KEY,
                date DATE,
                startTime TIME,
                endTime TIME,
                schoolClassId INT,
                subjectId INT,
                teacherId INT,
                roomId INT,
                examPeriodId INT,
                examType ENUM('FIRST TERM','SECOND TERM','THIRD TERM')
            )
        `);

    await queryRunner.query(`
            CREATE TABLE submissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fileUrl VARCHAR(255),
                marks INT,
                feedback VARCHAR(255),
                submittedAt DATETIME(6),
                assignmentId INT,
                studentId INT
            )
        `);

    await queryRunner.query(`
            CREATE TABLE marks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                score FLOAT,
                studentId INT,
                examId INT
            )
        `);
  }
}
