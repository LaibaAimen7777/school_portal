import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudentTables1787133339899 implements MigrationInterface {
    name = 'CreateStudentTables1787133339899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_student_class\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_student_parent\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`is_graduated\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`graduated_at\``);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`isGraduated\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`graduatedAt\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_1f1c23decbdde9e509a4f7d753d\` FOREIGN KEY (\`schoolClassId\`) REFERENCES \`school_class\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_d728e971c60c58a818dd9e614ab\` FOREIGN KEY (\`parentId\`) REFERENCES \`parent\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_d728e971c60c58a818dd9e614ab\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_1f1c23decbdde9e509a4f7d753d\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`graduatedAt\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`isGraduated\``);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`graduated_at\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`is_graduated\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_student_parent\` FOREIGN KEY (\`parentId\`) REFERENCES \`parent\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_student_class\` FOREIGN KEY (\`schoolClassId\`) REFERENCES \`school_class\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
