import { MovieQuality, MovieStatus } from '../../../core/models';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { BasicMigrationProperty } from '../helpers';

const { createdAt, updatedAt } = BasicMigrationProperty;

export class CREATETABLEMOVIE1601643423533 implements MigrationInterface {
  tableName = 'movie';

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
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'release',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'runtime',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'genre',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'age',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'poster',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(MovieStatus),
            isNullable: false,
          },
          {
            name: 'quality',
            type: 'enum',
            enum: Object.values(MovieQuality),
            isNullable: false,
          },
          {
            name: 'countryId',
            type: 'int',
            isNullable: false,
          },
          createdAt,
          updatedAt,
        ],
        foreignKeys: [
          {
            columnNames: ['countryId'],
            name: 'FK_MOVIE_COUNTRYID',
            referencedTableName: 'country',
            referencedColumnNames: ['id'],
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
        ],
        indices: [
          {
            columnNames: ['title'],
            name: 'IDX_MOVIE_TITLE',
          },
          {
            columnNames: ['description'],
            name: 'IDX_MOVIE_DESCRIPTION',
          },
          {
            columnNames: ['release'],
            name: 'IDX_MOVIE_RELEASE',
          },
          {
            columnNames: ['runtime'],
            name: 'IDX_MOVIE_RUNTIME',
          },
          {
            columnNames: ['age'],
            name: 'IDX_MOVIE_AGE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(this.tableName, 'IDX_MOVIE_TITLE');
    await queryRunner.dropIndex(this.tableName, 'IDX_MOVIE_DESCRIPTION');
    await queryRunner.dropIndex(this.tableName, 'IDX_MOVIE_RELEASE');
    await queryRunner.dropIndex(this.tableName, 'IDX_MOVIE_RUNTIME');
    await queryRunner.dropIndex(this.tableName, 'IDX_MOVIE_AGE');

    await queryRunner.dropForeignKey(this.tableName, 'FK_MOVIE_COUNTRYID');

    await queryRunner.dropTable(this.tableName);
  }
}
