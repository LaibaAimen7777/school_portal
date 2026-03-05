import { MigrationInterface, QueryRunner } from "typeorm";

export class CrateScheduleTable1772658358112 implements MigrationInterface {
    name = 'CrateScheduleTable1772658358112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dayOfWeek\` varchar(255) NOT NULL, \`startTime\` varchar(255) NOT NULL, \`endTime\` varchar(255) NOT NULL, \`schoolClassId\` int NULL, \`subjectId\` int NULL, \`teacherId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_fa9eca499bb208b5a74f45923dd\` FOREIGN KEY (\`schoolClassId\`) REFERENCES \`school_class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_9fa71efc605659e54dec60bf17e\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_7c4e49233bde738d80d6eae6805\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teachers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_7c4e49233bde738d80d6eae6805\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_9fa71efc605659e54dec60bf17e\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_fa9eca499bb208b5a74f45923dd\``);
        await queryRunner.query(`DROP TABLE \`schedule\``);
    }

}
