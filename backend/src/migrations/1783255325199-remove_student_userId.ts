import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveStudentUserId1783255325199 implements MigrationInterface {
    name = 'RemoveStudentUserId1783255325199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_b35463776b4a11a3df3c30d920a\``);
        await queryRunner.query(`DROP INDEX \`REL_b35463776b4a11a3df3c30d920\` ON \`student\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('parent', 'teacher', 'admin') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('student', 'parent', 'teacher', 'admin') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`userId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b35463776b4a11a3df3c30d920\` ON \`student\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_b35463776b4a11a3df3c30d920a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
