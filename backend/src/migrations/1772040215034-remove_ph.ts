import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePh1772040215034 implements MigrationInterface {
    name = 'RemovePh1772040215034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a51bd21a6e90dbe656ad65cab8\` ON \`parent\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a51bd21a6e90dbe656ad65cab8\` ON \`parent\` (\`userId\`)`);
    }

}
