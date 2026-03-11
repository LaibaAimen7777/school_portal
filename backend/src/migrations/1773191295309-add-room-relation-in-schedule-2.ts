import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoomRelationInSchedule21773191295309 implements MigrationInterface {
    name = 'AddRoomRelationInSchedule21773191295309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` CHANGE \`room\` \`roomId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`roomId\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`roomId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_d2fd722dce1cb2d6f458f0fe446\` FOREIGN KEY (\`roomId\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_d2fd722dce1cb2d6f458f0fe446\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`roomId\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`roomId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` CHANGE \`roomId\` \`room\` varchar(255) NOT NULL`);
    }

}
