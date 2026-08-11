import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateScheduleOverride1786439969249 implements MigrationInterface {
    name = 'CreateScheduleOverride1786439969249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`grade_schedule_override\` (\`id\` int NOT NULL AUTO_INCREMENT, \`grade\` int NOT NULL, \`endTime\` time NULL, \`fridayEndTime\` time NULL, \`schoolConfigId\` int NULL, UNIQUE INDEX \`IDX_6bb66b73a94c6514195a8fa7aa\` (\`grade\`, \`schoolConfigId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`school_config\` ADD \`breakAfterPeriod\` int NOT NULL DEFAULT '4'`);
        await queryRunner.query(`ALTER TABLE \`school_config\` ADD \`fridayEndTime\` time NULL`);
        await queryRunner.query(`ALTER TABLE \`grade_schedule_override\` ADD CONSTRAINT \`FK_5dec8ee04c052636a8dad4c3195\` FOREIGN KEY (\`schoolConfigId\`) REFERENCES \`school_config\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`grade_schedule_override\` DROP FOREIGN KEY \`FK_5dec8ee04c052636a8dad4c3195\``);
        await queryRunner.query(`ALTER TABLE \`school_config\` DROP COLUMN \`fridayEndTime\``);
        await queryRunner.query(`ALTER TABLE \`school_config\` DROP COLUMN \`breakAfterPeriod\``);
        await queryRunner.query(`DROP INDEX \`IDX_6bb66b73a94c6514195a8fa7aa\` ON \`grade_schedule_override\``);
        await queryRunner.query(`DROP TABLE \`grade_schedule_override\``);
    }

}
