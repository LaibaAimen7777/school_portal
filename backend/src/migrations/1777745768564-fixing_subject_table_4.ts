import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingSubjectTable41777745768564 implements MigrationInterface {
    name = 'FixingSubjectTable41777745768564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD \`grades\` json NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP COLUMN \`grades\``);
    }

}
