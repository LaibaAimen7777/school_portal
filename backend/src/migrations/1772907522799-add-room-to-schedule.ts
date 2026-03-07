import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoomToSchedule1772907522799 implements MigrationInterface {
    name = 'AddRoomToSchedule1772907522799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`room\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`room\``);
    }

}
