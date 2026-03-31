import { MigrationInterface, QueryRunner } from "typeorm";

export class NewTables1774968898604 implements MigrationInterface {
    name = 'NewTables1774968898604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`assignments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`dueDate\` date NOT NULL, \`teacherId\` int NULL, \`subjectId\` int NULL, \`schoolClassId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`submissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fileUrl\` varchar(255) NOT NULL, \`marks\` int NULL, \`feedback\` varchar(255) NULL, \`submittedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`assignmentId\` int NULL, \`studentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exams\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`subjectId\` int NULL, \`schoolClassId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`marks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`score\` float NOT NULL, \`studentId\` int NULL, \`examId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attendance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` date NOT NULL, \`status\` enum ('PRESENT', 'ABSENT') NOT NULL DEFAULT 'PRESENT', \`studentId\` int NULL, \`scheduleId\` int NULL, UNIQUE INDEX \`IDX_3a73db4b1b7f57b7c6edcc6f43\` (\`studentId\`, \`scheduleId\`, \`date\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`assignments\` ADD CONSTRAINT \`FK_e9a3111140d313859c9dfa8f22d\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teachers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assignments\` ADD CONSTRAINT \`FK_590e36b2cf3e615ba5ecb161dd3\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assignments\` ADD CONSTRAINT \`FK_f7864083e31507b3982a51c36eb\` FOREIGN KEY (\`schoolClassId\`) REFERENCES \`school_class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submissions\` ADD CONSTRAINT \`FK_c2611c601f49945ceff5c0909a2\` FOREIGN KEY (\`assignmentId\`) REFERENCES \`assignments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submissions\` ADD CONSTRAINT \`FK_4fc99318a291abd7e2a50f50851\` FOREIGN KEY (\`studentId\`) REFERENCES \`student\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD CONSTRAINT \`FK_1dc4dcc3e975e1378e9d235cd1c\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD CONSTRAINT \`FK_e929267ee2506c02a479fbea400\` FOREIGN KEY (\`schoolClassId\`) REFERENCES \`school_class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`marks\` ADD CONSTRAINT \`FK_aa9e8312f7ce21846e5e2c3152a\` FOREIGN KEY (\`studentId\`) REFERENCES \`student\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`marks\` ADD CONSTRAINT \`FK_e837768e283c8eb561c15ae2020\` FOREIGN KEY (\`examId\`) REFERENCES \`exams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD CONSTRAINT \`FK_120e1c6edcec4f8221f467c8039\` FOREIGN KEY (\`studentId\`) REFERENCES \`student\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD CONSTRAINT \`FK_3e9494ce43bd943773a943aca89\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP FOREIGN KEY \`FK_3e9494ce43bd943773a943aca89\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP FOREIGN KEY \`FK_120e1c6edcec4f8221f467c8039\``);
        await queryRunner.query(`ALTER TABLE \`marks\` DROP FOREIGN KEY \`FK_e837768e283c8eb561c15ae2020\``);
        await queryRunner.query(`ALTER TABLE \`marks\` DROP FOREIGN KEY \`FK_aa9e8312f7ce21846e5e2c3152a\``);
        await queryRunner.query(`ALTER TABLE \`exams\` DROP FOREIGN KEY \`FK_e929267ee2506c02a479fbea400\``);
        await queryRunner.query(`ALTER TABLE \`exams\` DROP FOREIGN KEY \`FK_1dc4dcc3e975e1378e9d235cd1c\``);
        await queryRunner.query(`ALTER TABLE \`submissions\` DROP FOREIGN KEY \`FK_4fc99318a291abd7e2a50f50851\``);
        await queryRunner.query(`ALTER TABLE \`submissions\` DROP FOREIGN KEY \`FK_c2611c601f49945ceff5c0909a2\``);
        await queryRunner.query(`ALTER TABLE \`assignments\` DROP FOREIGN KEY \`FK_f7864083e31507b3982a51c36eb\``);
        await queryRunner.query(`ALTER TABLE \`assignments\` DROP FOREIGN KEY \`FK_590e36b2cf3e615ba5ecb161dd3\``);
        await queryRunner.query(`ALTER TABLE \`assignments\` DROP FOREIGN KEY \`FK_e9a3111140d313859c9dfa8f22d\``);
        await queryRunner.query(`DROP INDEX \`IDX_3a73db4b1b7f57b7c6edcc6f43\` ON \`attendance\``);
        await queryRunner.query(`DROP TABLE \`attendance\``);
        await queryRunner.query(`DROP TABLE \`marks\``);
        await queryRunner.query(`DROP TABLE \`exams\``);
        await queryRunner.query(`DROP TABLE \`submissions\``);
        await queryRunner.query(`DROP TABLE \`assignments\``);
    }

}
