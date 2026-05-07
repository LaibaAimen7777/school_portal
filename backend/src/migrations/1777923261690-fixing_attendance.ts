import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingAttendance1777923261690 implements MigrationInterface {
    name = 'FixingAttendance1777923261690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP FOREIGN KEY \`FK_3e9494ce43bd943773a943aca89\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD CONSTRAINT \`FK_3e9494ce43bd943773a943aca89\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`schedule\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP FOREIGN KEY \`FK_3e9494ce43bd943773a943aca89\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD CONSTRAINT \`FK_3e9494ce43bd943773a943aca89\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
