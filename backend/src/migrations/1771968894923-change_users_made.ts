import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUsersMade1771968894923 implements MigrationInterface {
    name = 'ChangeUsersMade1771968894923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_b35463776b4a11a3df3c30d920a\``);
        await queryRunner.query(`ALTER TABLE \`parent\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`parent\` ADD UNIQUE INDEX \`IDX_a51bd21a6e90dbe656ad65cab8\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a51bd21a6e90dbe656ad65cab8\` ON \`parent\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_b35463776b4a11a3df3c30d920a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`parent\` ADD CONSTRAINT \`FK_a51bd21a6e90dbe656ad65cab89\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parent\` DROP FOREIGN KEY \`FK_a51bd21a6e90dbe656ad65cab89\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_b35463776b4a11a3df3c30d920a\``);
        await queryRunner.query(`DROP INDEX \`REL_a51bd21a6e90dbe656ad65cab8\` ON \`parent\``);
        await queryRunner.query(`ALTER TABLE \`parent\` DROP INDEX \`IDX_a51bd21a6e90dbe656ad65cab8\``);
        await queryRunner.query(`ALTER TABLE \`parent\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_b35463776b4a11a3df3c30d920a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
