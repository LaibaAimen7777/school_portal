import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSubjectTable1772388896677 implements MigrationInterface {
    name = 'CreateSubjectTable1772388896677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`subjects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_47a287fe64bd0e1027e603c335\` (\`name\`), UNIQUE INDEX \`IDX_542cbba74dde3c82ab49c57310\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_542cbba74dde3c82ab49c57310\` ON \`subjects\``);
        await queryRunner.query(`DROP INDEX \`IDX_47a287fe64bd0e1027e603c335\` ON \`subjects\``);
        await queryRunner.query(`DROP TABLE \`subjects\``);
    }

}
