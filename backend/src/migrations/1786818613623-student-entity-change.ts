import { MigrationInterface, QueryRunner } from "typeorm";

export class StudentEntityChange1786818613623 implements MigrationInterface {
    name = 'StudentEntityChange1786818613623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_1f1c23decbdde9e509a4f7d753d\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc34862eb1ba92f7a3550194eb\` ON \`student\``);
        await queryRunner.query(`ALTER TABLE \`student\` CHANGE \`schoolClassId\` \`schoolClassId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_bc34862eb1ba92f7a3550194eb\` ON \`student\` (\`schoolClassId\`, \`rollNumber\`)`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_1f1c23decbdde9e509a4f7d753d\` FOREIGN KEY (\`schoolClassId\`) REFERENCES \`school_class\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_1f1c23decbdde9e509a4f7d753d\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc34862eb1ba92f7a3550194eb\` ON \`student\``);
        await queryRunner.query(`ALTER TABLE \`student\` CHANGE \`schoolClassId\` \`schoolClassId\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_bc34862eb1ba92f7a3550194eb\` ON \`student\` (\`schoolClassId\`, \`rollNumber\`)`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_1f1c23decbdde9e509a4f7d753d\` FOREIGN KEY (\`schoolClassId\`) REFERENCES \`school_class\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
