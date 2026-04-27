import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingExamAndMarks1776714510703 implements MigrationInterface {
    name = 'AddingExamAndMarks1776714510703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`exams\` (\`id\` int NOT NULL AUTO_INCREMENT, \`examType\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`time\` time NOT NULL, \`room\` varchar(255) NOT NULL, \`scheduleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`marks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`score\` float NOT NULL, \`studentId\` int NULL, \`examId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD CONSTRAINT \`FK_9a0d08b85155b01881c16ac79f3\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`marks\` ADD CONSTRAINT \`FK_aa9e8312f7ce21846e5e2c3152a\` FOREIGN KEY (\`studentId\`) REFERENCES \`student\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`marks\` ADD CONSTRAINT \`FK_e837768e283c8eb561c15ae2020\` FOREIGN KEY (\`examId\`) REFERENCES \`exams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`marks\` DROP FOREIGN KEY \`FK_e837768e283c8eb561c15ae2020\``);
        await queryRunner.query(`ALTER TABLE \`marks\` DROP FOREIGN KEY \`FK_aa9e8312f7ce21846e5e2c3152a\``);
        await queryRunner.query(`ALTER TABLE \`exams\` DROP FOREIGN KEY \`FK_9a0d08b85155b01881c16ac79f3\``);
        await queryRunner.query(`DROP TABLE \`marks\``);
        await queryRunner.query(`DROP TABLE \`exams\``);
    }

}
