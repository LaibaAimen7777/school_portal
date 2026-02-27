import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTeacherTable1772217904137 implements MigrationInterface {
    name = 'CreateTeacherTable1772217904137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`teachers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`teacherCode\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`qualification\` varchar(255) NOT NULL, \`specialization\` varchar(255) NULL, \`hireDate\` date NULL, \`userId\` int NULL, UNIQUE INDEX \`IDX_680af6a3ad8bc80697654351c0\` (\`teacherCode\`), UNIQUE INDEX \`REL_4d8041cbc103a5142fa2f2afad\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`teachers\` ADD CONSTRAINT \`FK_4d8041cbc103a5142fa2f2afad4\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teachers\` DROP FOREIGN KEY \`FK_4d8041cbc103a5142fa2f2afad4\``);
        await queryRunner.query(`DROP INDEX \`REL_4d8041cbc103a5142fa2f2afad\` ON \`teachers\``);
        await queryRunner.query(`DROP INDEX \`IDX_680af6a3ad8bc80697654351c0\` ON \`teachers\``);
        await queryRunner.query(`DROP TABLE \`teachers\``);
    }

}
