import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { BasicMigrationProperty } from '../helpers';

const { createdAt, updatedAt } = BasicMigrationProperty;

export class CREATETABLESESSION1601048675905 implements MigrationInterface {
  tableName = 'session';

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
            name: 'accessToken',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'refreshToken',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'ipAddress',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          createdAt,
          updatedAt,
        ],
        foreignKeys: [
          {
            columnNames: ['userId'],
            name: 'FK_SESSION_USERID',
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
