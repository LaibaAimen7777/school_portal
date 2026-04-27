import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewTables1777064023554 implements MigrationInterface {
    name = 'AddNewTables1777064023554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`marks\` DROP FOREIGN KEY \`FK_e837768e283c8eb561c15ae2020\``);
        await queryRunner.query(`CREATE TABLE \`school_config\` (\`id\` int NOT NULL AUTO_INCREMENT, \`schoolStartTime\` time NOT NULL, \`schoolEndTime\` time NOT NULL, \`periodDurationMinutes\` int NOT NULL DEFAULT '40', \`breakDurationMinutes\` int NOT NULL DEFAULT '5', \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exam_period\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`startDate\` date NOT NULL, \`endDate\` date NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exam\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` date NOT NULL, \`startTime\` time NOT NULL, \`endTime\` time NOT NULL, \`examType\` varchar(255) NOT NULL DEFAULT 'MIDTERM', \`schoolClassId\` int NULL, \`subjectId\` int NULL, \`teacherId\` int NULL, \`roomId\` int NULL, \`examPeriodId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_80961b495def2cfc1fc64a0ece8\` FOREIGN KEY (\`schoolClassId\`) REFERENCES \`school_class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_d0c14897766a526d7b52cd78977\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_d8925a9c61fc74fdacfc5f0b2db\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teachers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_8b89477b815afa87d75744299bf\` FOREIGN KEY (\`roomId\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_3dddde244ac3945802ed84d14e8\` FOREIGN KEY (\`examPeriodId\`) REFERENCES \`exam_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`marks\` ADD CONSTRAINT \`FK_e837768e283c8eb561c15ae2020\` FOREIGN KEY (\`examId\`) REFERENCES \`exam\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`marks\` DROP FOREIGN KEY \`FK_e837768e283c8eb561c15ae2020\``);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_3dddde244ac3945802ed84d14e8\``);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_8b89477b815afa87d75744299bf\``);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_d8925a9c61fc74fdacfc5f0b2db\``);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_d0c14897766a526d7b52cd78977\``);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_80961b495def2cfc1fc64a0ece8\``);
        await queryRunner.query(`DROP TABLE \`exam\``);
        await queryRunner.query(`DROP TABLE \`exam_period\``);
        await queryRunner.query(`DROP TABLE \`school_config\``);
        await queryRunner.query(`ALTER TABLE \`marks\` ADD CONSTRAINT \`FK_e837768e283c8eb561c15ae2020\` FOREIGN KEY (\`examId\`) REFERENCES \`exams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
