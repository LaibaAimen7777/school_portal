import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncTablesAgain1775137589279 implements MigrationInterface {
    name = 'SyncTablesAgain1775137589279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exams\` DROP FOREIGN KEY \`FK_1dc4dcc3e975e1378e9d235cd1c\``);
        await queryRunner.query(`ALTER TABLE \`exams\` DROP FOREIGN KEY \`FK_e929267ee2506c02a479fbea400\``);
        await queryRunner.query(`ALTER TABLE \`exams\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`exams\` DROP COLUMN \`subjectId\``);
        await queryRunner.query(`ALTER TABLE \`exams\` DROP COLUMN \`schoolClassId\``);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD \`examType\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD \`date\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD \`scheduleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD CONSTRAINT \`FK_9a0d08b85155b01881c16ac79f3\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exams\` DROP FOREIGN KEY \`FK_9a0d08b85155b01881c16ac79f3\``);
        await queryRunner.query(`ALTER TABLE \`exams\` DROP COLUMN \`scheduleId\``);
        await queryRunner.query(`ALTER TABLE \`exams\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`exams\` DROP COLUMN \`examType\``);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD \`schoolClassId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD \`subjectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD CONSTRAINT \`FK_e929267ee2506c02a479fbea400\` FOREIGN KEY (\`schoolClassId\`) REFERENCES \`school_class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD CONSTRAINT \`FK_1dc4dcc3e975e1378e9d235cd1c\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
