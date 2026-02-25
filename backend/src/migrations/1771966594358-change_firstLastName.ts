import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeFirstLastName1771966594358 implements MigrationInterface {
    name = 'ChangeFirstLastName1771966594358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`parent\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fatherName\` varchar(255) NOT NULL, \`motherName\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`address\` varchar(255) NULL, UNIQUE INDEX \`IDX_367fe6e1eb95b0d51ed6bc943c\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`dateOfBirth\` date NOT NULL, \`gender\` varchar(255) NOT NULL, \`rollNumber\` int NOT NULL, \`joiningYear\` int NOT NULL, \`schoolClassId\` int NOT NULL, \`userId\` int NULL, \`parentId\` int NULL, UNIQUE INDEX \`IDX_bc34862eb1ba92f7a3550194eb\` (\`schoolClassId\`, \`rollNumber\`), UNIQUE INDEX \`REL_b35463776b4a11a3df3c30d920\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_1f1c23decbdde9e509a4f7d753d\` FOREIGN KEY (\`schoolClassId\`) REFERENCES \`school_class\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_b35463776b4a11a3df3c30d920a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_d728e971c60c58a818dd9e614ab\` FOREIGN KEY (\`parentId\`) REFERENCES \`parent\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_d728e971c60c58a818dd9e614ab\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_b35463776b4a11a3df3c30d920a\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_1f1c23decbdde9e509a4f7d753d\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`REL_b35463776b4a11a3df3c30d920\` ON \`student\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc34862eb1ba92f7a3550194eb\` ON \`student\``);
        await queryRunner.query(`DROP TABLE \`student\``);
        await queryRunner.query(`DROP INDEX \`IDX_367fe6e1eb95b0d51ed6bc943c\` ON \`parent\``);
        await queryRunner.query(`DROP TABLE \`parent\``);
    }

}
