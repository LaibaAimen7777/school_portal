import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingSubjectTable21777724613610 implements MigrationInterface {
    name = 'FixingSubjectTable21777724613610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teachers_subjects_subjects\` DROP FOREIGN KEY \`FK_4afd1f51df48493ea92f3e62a82\``);
        await queryRunner.query(`ALTER TABLE \`teachers_subjects_subjects\` ADD CONSTRAINT \`FK_4afd1f51df48493ea92f3e62a82\` FOREIGN KEY (\`subjectsId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teachers_subjects_subjects\` DROP FOREIGN KEY \`FK_4afd1f51df48493ea92f3e62a82\``);
        await queryRunner.query(`ALTER TABLE \`teachers_subjects_subjects\` ADD CONSTRAINT \`FK_4afd1f51df48493ea92f3e62a82\` FOREIGN KEY (\`subjectsId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
