import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncTables1773691647180 implements MigrationInterface {
    name = 'SyncTables1773691647180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`startTime\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`startTime\` time NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`endTime\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`endTime\` time NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`endTime\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`endTime\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`startTime\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`startTime\` varchar(255) NOT NULL`);
    }

}
