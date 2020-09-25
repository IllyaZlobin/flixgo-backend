import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { BasicMigrationProperty } from '../helpers';

const { createdAt, updatedAt } = BasicMigrationProperty;

export class CREATETABLECOUNTRY1601050093408 implements MigrationInterface {
  tableName = 'country';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          createdAt,
          updatedAt,
        ],
        indices: [{ name: 'IDX_COUNTRY_NAME', columnNames: ['name'] }],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
