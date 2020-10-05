import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { BasicMigrationProperty } from '../helpers';

const { createdAt, updatedAt } = BasicMigrationProperty;

export class CREATETABLEMOVIERATING1601885341461 implements MigrationInterface {
  tableName = 'movie_rating';

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
            name: 'rating',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'movieId',
            type: 'int',
            isNullable: false,
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
            name: 'FK_MOVIE_RATING_MOVIEID',
            columnNames: ['movieId'],
            referencedTableName: 'movie',
            referencedColumnNames: ['id'],
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
          {
            name: 'FK_MOVIE_RATING_USERID',
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(this.tableName, 'FK_MOVIE_RATING_MOVIEID');
    await queryRunner.dropIndex(this.tableName, 'FK_MOVIE_RATING_USERID');

    await queryRunner.dropTable(this.tableName);
  }
}
