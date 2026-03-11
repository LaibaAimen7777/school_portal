import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoomRelationInSchedule1773173114704 implements MigrationInterface {
    name = 'AddRoomRelationInSchedule1773173114704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rooms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`rooms\``);
    }

}
