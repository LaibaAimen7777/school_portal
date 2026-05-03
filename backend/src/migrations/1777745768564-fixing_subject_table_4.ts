import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixingSubjectTable41777745768564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add column as nullable with no default
    await queryRunner.query(
      `ALTER TABLE \`subjects\` ADD \`grades\` json NULL`,
    );

    // Step 2: Set existing rows to empty array
    await queryRunner.query(
      `UPDATE \`subjects\` SET \`grades\` = '[]' WHERE \`grades\` IS NULL`,
    );

    // Step 3: Now make it NOT NULL
    await queryRunner.query(
      `ALTER TABLE \`subjects\` MODIFY \`grades\` json NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`subjects\` DROP COLUMN \`grades\``);
  }
}
