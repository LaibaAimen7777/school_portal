import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingSubjectTable31777743072319 implements MigrationInterface {
    name = 'FixingSubjectTable31777743072319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP COLUMN \`grades\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD \`grades\` json NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP COLUMN \`grades\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD \`grades\` text NOT NULL`);
    }

}
