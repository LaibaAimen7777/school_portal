import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingSubjectTable41777834734833 implements MigrationInterface {
    name = 'FixingSubjectTable41777834734833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD \`periodsPerWeek\` int NOT NULL DEFAULT '5'`);
        await queryRunner.query(`ALTER TABLE \`subjects\` CHANGE \`grades\` \`grades\` json NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subjects\` CHANGE \`grades\` \`grades\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP COLUMN \`periodsPerWeek\``);
    }

}
