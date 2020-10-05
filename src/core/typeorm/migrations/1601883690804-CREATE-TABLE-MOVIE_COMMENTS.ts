import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { BasicMigrationProperty } from '../helpers';

const { createdAt, updatedAt } = BasicMigrationProperty;

export class CREATETABLEMOVIECOMMENTS1601883690804
  implements MigrationInterface {
  tableName = 'movie_comments';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
          name: 'text',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'userId',
          type: 'int',
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
          columnNames: ['userId'],
          name: 'FX_MOVIE_COMMENTS_USERID',
          referencedTableName: 'user',
          referencedColumnNames: ['id'],
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
        {
          columnNames: ['movieId'],
          name: 'FK_MOVIE_COMMENTS_MOVIEID',
          referencedTableName: 'movie',
          referencedColumnNames: ['id'],
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      ],
      indices: [
        {
          columnNames: ['text'],
          name: 'IDX_MOVIE_COMMENTS_TEXT',
        },
      ],
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(this.tableName, 'IDX_MOVIE_COMMENTS_TEXT');
    await queryRunner.dropForeignKey(
      this.tableName,
      'FK_MOVIE_COMMENTS_MOVIEID',
    );
    await queryRunner.dropTable(this.tableName);
  }
}
