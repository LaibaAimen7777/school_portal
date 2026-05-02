import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingSubjectTable1777723450981 implements MigrationInterface {
    name = 'FixingSubjectTable1777723450981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD \`grades\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP COLUMN \`grades\``);
    }

}
