import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixesWithTheTeacherGrade1780835795291 implements MigrationInterface {
  name = 'FixesWithTheTeacherGrade1780835795291';

  private async fkExists(
    queryRunner: QueryRunner,
    table: string,
    fkName: string,
  ): Promise<boolean> {
    const result = await queryRunner.query(`
            SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE()
            AND TABLE_NAME = '${table}'
            AND CONSTRAINT_NAME = '${fkName}'
        `);
    return result.length > 0;
  }

  private async tableExists(
    queryRunner: QueryRunner,
    table: string,
  ): Promise<boolean> {
    const result = await queryRunner.query(`
            SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${table}'
        `);
    return result.length > 0;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ── Drop FKs only if they exist ────────────────────────────────────
    if (
      await this.fkExists(
        queryRunner,
        'schedule',
        'FK_7c4e49233bde738d80d6eae6805',
      )
    )
      await queryRunner.query(
        `ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_7c4e49233bde738d80d6eae6805\``,
      );

    if (
      await this.fkExists(
        queryRunner,
        'assignments',
        'FK_e9a3111140d313859c9dfa8f22d',
      )
    )
      await queryRunner.query(
        `ALTER TABLE \`assignments\` DROP FOREIGN KEY \`FK_e9a3111140d313859c9dfa8f22d\``,
      );

    if (
      await this.fkExists(queryRunner, 'exam', 'FK_d8925a9c61fc74fdacfc5f0b2db')
    )
      await queryRunner.query(
        `ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_d8925a9c61fc74fdacfc5f0b2db\``,
      );

    // ── Create tables only if they don't exist ─────────────────────────
    if (!(await this.tableExists(queryRunner, 'teacher_subject_grades'))) {
      await queryRunner.query(`
                CREATE TABLE \`teacher_subject_grades\` (
                    \`id\` int NOT NULL AUTO_INCREMENT,
                    \`grade\` int NOT NULL,
                    \`teacherId\` int NULL,
                    \`subjectId\` int NULL,
                    UNIQUE INDEX \`IDX_fedcd908573ad6b46727976ef9\` (\`teacherId\`, \`subjectId\`, \`grade\`),
                    PRIMARY KEY (\`id\`)
                ) ENGINE=InnoDB
            `);
    }

    if (!(await this.tableExists(queryRunner, 'teacher'))) {
      await queryRunner.query(`
                CREATE TABLE \`teacher\` (
                    \`id\` int NOT NULL AUTO_INCREMENT,
                    \`teacherCode\` varchar(255) NOT NULL,
                    \`fullName\` varchar(255) NOT NULL,
                    \`qualification\` varchar(255) NULL,
                    \`hireDate\` date NULL,
                    \`userId\` int NULL,
                    UNIQUE INDEX \`REL_4f596730e16ee49d9b081b5d8e\` (\`userId\`),
                    PRIMARY KEY (\`id\`)
                ) ENGINE=InnoDB
            `);
    }

    // ── Migrate data from old 'teachers' table if it exists ────────────
    if (await this.tableExists(queryRunner, 'teachers')) {
      await queryRunner.query(`
                INSERT IGNORE INTO \`teacher\`
                    (\`id\`, \`teacherCode\`, \`fullName\`, \`qualification\`, \`hireDate\`, \`userId\`)
                SELECT \`id\`, \`teacherCode\`, \`fullName\`, \`qualification\`, \`hireDate\`, \`userId\`
                FROM \`teachers\`
            `);
    }

    // ── Clean orphaned rows ────────────────────────────────────────────
    await queryRunner.query(
      `DELETE FROM \`schedule\` WHERE \`teacherId\` IS NOT NULL AND \`teacherId\` NOT IN (SELECT \`id\` FROM \`teacher\`)`,
    );
    await queryRunner.query(
      `DELETE FROM \`assignments\` WHERE \`teacherId\` IS NOT NULL AND \`teacherId\` NOT IN (SELECT \`id\` FROM \`teacher\`)`,
    );
    await queryRunner.query(
      `DELETE FROM \`exam\` WHERE \`teacherId\` IS NOT NULL AND \`teacherId\` NOT IN (SELECT \`id\` FROM \`teacher\`)`,
    );

    // ── Add FKs only if they don't exist ──────────────────────────────
    if (
      !(await this.fkExists(
        queryRunner,
        'teacher_subject_grades',
        'FK_e912e50dcdd57a7e649d44c77bb',
      ))
    )
      await queryRunner.query(
        `ALTER TABLE \`teacher_subject_grades\` ADD CONSTRAINT \`FK_e912e50dcdd57a7e649d44c77bb\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teacher\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
      );

    if (
      !(await this.fkExists(
        queryRunner,
        'teacher_subject_grades',
        'FK_9178bfd95f06ab71355b3556ffc',
      ))
    )
      await queryRunner.query(
        `ALTER TABLE \`teacher_subject_grades\` ADD CONSTRAINT \`FK_9178bfd95f06ab71355b3556ffc\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
      );

    if (
      !(await this.fkExists(
        queryRunner,
        'teacher',
        'FK_4f596730e16ee49d9b081b5d8e5',
      ))
    )
      await queryRunner.query(
        `ALTER TABLE \`teacher\` ADD CONSTRAINT \`FK_4f596730e16ee49d9b081b5d8e5\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
      );

    if (
      !(await this.fkExists(
        queryRunner,
        'schedule',
        'FK_7c4e49233bde738d80d6eae6805',
      ))
    )
      await queryRunner.query(
        `ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_7c4e49233bde738d80d6eae6805\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teacher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );

    if (
      !(await this.fkExists(
        queryRunner,
        'assignments',
        'FK_e9a3111140d313859c9dfa8f22d',
      ))
    )
      await queryRunner.query(
        `ALTER TABLE \`assignments\` ADD CONSTRAINT \`FK_e9a3111140d313859c9dfa8f22d\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teacher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );

    if (
      !(await this.fkExists(
        queryRunner,
        'exam',
        'FK_d8925a9c61fc74fdacfc5f0b2db',
      ))
    )
      await queryRunner.query(
        `ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_d8925a9c61fc74fdacfc5f0b2db\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teacher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (
      await this.fkExists(queryRunner, 'exam', 'FK_d8925a9c61fc74fdacfc5f0b2db')
    )
      await queryRunner.query(
        `ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_d8925a9c61fc74fdacfc5f0b2db\``,
      );

    if (
      await this.fkExists(
        queryRunner,
        'assignments',
        'FK_e9a3111140d313859c9dfa8f22d',
      )
    )
      await queryRunner.query(
        `ALTER TABLE \`assignments\` DROP FOREIGN KEY \`FK_e9a3111140d313859c9dfa8f22d\``,
      );

    if (
      await this.fkExists(
        queryRunner,
        'schedule',
        'FK_7c4e49233bde738d80d6eae6805',
      )
    )
      await queryRunner.query(
        `ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_7c4e49233bde738d80d6eae6805\``,
      );

    if (
      await this.fkExists(
        queryRunner,
        'teacher',
        'FK_4f596730e16ee49d9b081b5d8e5',
      )
    )
      await queryRunner.query(
        `ALTER TABLE \`teacher\` DROP FOREIGN KEY \`FK_4f596730e16ee49d9b081b5d8e5\``,
      );

    if (
      await this.fkExists(
        queryRunner,
        'teacher_subject_grades',
        'FK_9178bfd95f06ab71355b3556ffc',
      )
    )
      await queryRunner.query(
        `ALTER TABLE \`teacher_subject_grades\` DROP FOREIGN KEY \`FK_9178bfd95f06ab71355b3556ffc\``,
      );

    if (
      await this.fkExists(
        queryRunner,
        'teacher_subject_grades',
        'FK_e912e50dcdd57a7e649d44c77bb',
      )
    )
      await queryRunner.query(
        `ALTER TABLE \`teacher_subject_grades\` DROP FOREIGN KEY \`FK_e912e50dcdd57a7e649d44c77bb\``,
      );

    if (await this.tableExists(queryRunner, 'teacher'))
      await queryRunner.query(`DROP TABLE \`teacher\``);

    if (await this.tableExists(queryRunner, 'teacher_subject_grades'))
      await queryRunner.query(`DROP TABLE \`teacher_subject_grades\``);

    if (await this.tableExists(queryRunner, 'teachers')) {
      await queryRunner.query(
        `ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_d8925a9c61fc74fdacfc5f0b2db\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teachers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
      await queryRunner.query(
        `ALTER TABLE \`assignments\` ADD CONSTRAINT \`FK_e9a3111140d313859c9dfa8f22d\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teachers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
      await queryRunner.query(
        `ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_7c4e49233bde738d80d6eae6805\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teachers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }
  }
}
