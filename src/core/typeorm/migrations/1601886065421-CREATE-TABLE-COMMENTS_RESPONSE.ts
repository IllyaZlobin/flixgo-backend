import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { BasicMigrationProperty } from '../helpers';

const { createdAt, updatedAt } = BasicMigrationProperty;

export class CREATETABLECOMMENTSRESPONSE1601886065421
  implements MigrationInterface {
  tableName = 'comments_response';

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
            name: 'like',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'dislike',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'movieCommentId',
            type: 'int',
            isNullable: false,
          },
          createdAt,
          updatedAt,
        ],
        foreignKeys: [
          {
            name: 'FK_COMMENTS_RESPONSE_USERID',
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
          {
            name: 'FK_COMMENTS_RESPONSE_MOVIECOMMENTID',
            columnNames: ['movieCommentId'],
            referencedTableName: 'movie_comments',
            referencedColumnNames: ['id'],
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.tableName,
      'FK_COMMENTS_RESPONSE_USERID',
    );
    await queryRunner.dropForeignKey(
      this.tableName,
      'FK_COMMENTS_RESPONSE_MOVIECOMMENTID',
    );

    await queryRunner.dropTable(this.tableName);
  }
}
