import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { BasicMigrationProperty } from '../helpers';

const { createdAt, updatedAt } = BasicMigrationProperty;

export class CREATETABLEMOVIEPHOTOS1601884844162 implements MigrationInterface {
  tableName = 'movie_photos';

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
            name: 'photo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'movieId',
            type: 'int',
            isNullable: false,
          },
          createdAt,
          updatedAt,
        ],
        foreignKeys: [
          {
            name: 'FK_MOVIE_PHOTOS_MOVIEID',
            columnNames: ['movieId'],
            referencedTableName: 'movie',
            referencedColumnNames: ['id'],
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, 'FK_MOVIE_PHOTOS_MOVIEID');
    await queryRunner.dropTable(this.tableName);
  }
}
