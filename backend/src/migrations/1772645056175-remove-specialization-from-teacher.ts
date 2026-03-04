import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveSpecializationFromTeacher1772645056175 implements MigrationInterface {
    name = 'RemoveSpecializationFromTeacher1772645056175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`teachers_subjects_subjects\` (\`teachersId\` int NOT NULL, \`subjectsId\` int NOT NULL, INDEX \`IDX_881ae84e059f2d51ce60ea8d60\` (\`teachersId\`), INDEX \`IDX_4afd1f51df48493ea92f3e62a8\` (\`subjectsId\`), PRIMARY KEY (\`teachersId\`, \`subjectsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`teachers\` DROP COLUMN \`specialization\``);
        await queryRunner.query(`ALTER TABLE \`teachers_subjects_subjects\` ADD CONSTRAINT \`FK_881ae84e059f2d51ce60ea8d604\` FOREIGN KEY (\`teachersId\`) REFERENCES \`teachers\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`teachers_subjects_subjects\` ADD CONSTRAINT \`FK_4afd1f51df48493ea92f3e62a82\` FOREIGN KEY (\`subjectsId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teachers_subjects_subjects\` DROP FOREIGN KEY \`FK_4afd1f51df48493ea92f3e62a82\``);
        await queryRunner.query(`ALTER TABLE \`teachers_subjects_subjects\` DROP FOREIGN KEY \`FK_881ae84e059f2d51ce60ea8d604\``);
        await queryRunner.query(`ALTER TABLE \`teachers\` ADD \`specialization\` varchar(255) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_4afd1f51df48493ea92f3e62a8\` ON \`teachers_subjects_subjects\``);
        await queryRunner.query(`DROP INDEX \`IDX_881ae84e059f2d51ce60ea8d60\` ON \`teachers_subjects_subjects\``);
        await queryRunner.query(`DROP TABLE \`teachers_subjects_subjects\``);
    }

}
