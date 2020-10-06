import { UserStatus } from '../../../core/models';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UPDATETABLEUSERCHANGEUSERSTATUS1602021807132
  implements MigrationInterface {
  tableName = 'user';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      this.tableName,
      'status',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: Object.values(UserStatus),
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
