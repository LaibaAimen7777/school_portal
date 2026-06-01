import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExamTimeToExamPeriod1780261668232 implements MigrationInterface {
    name = 'AddExamTimeToExamPeriod1780261668232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exam_period\` ADD \`examType\` enum ('FIRST TERM', 'SECOND TERM', 'THIRD TERM') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exam_period\` ADD \`durationMinutes\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP COLUMN \`examType\``);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD \`examType\` enum ('FIRST TERM', 'SECOND TERM', 'THIRD TERM') NOT NULL DEFAULT 'FIRST TERM'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exam\` DROP COLUMN \`examType\``);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD \`examType\` varchar(255) NOT NULL DEFAULT 'MIDTERM'`);
        await queryRunner.query(`ALTER TABLE \`exam_period\` DROP COLUMN \`durationMinutes\``);
        await queryRunner.query(`ALTER TABLE \`exam_period\` DROP COLUMN \`examType\``);
    }

}
