import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateReserves1752628839022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reserves',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'start_date',
            type: 'timestamp',
          },
          {
            name: 'end_date',
            type: 'timestamp',
          },
          {
            name: 'id_vehicle',
            type: 'uuid',
          },
          {
            name: 'id_user',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_reserves_vehicles',
            columnNames: ['id_vehicle'],
            referencedTableName: 'vehicles',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_reserves_users',
            columnNames: ['id_user'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'IDX_reserves_start_date',
            columnNames: ['start_date'],
          },
          {
            name: 'IDX_reserves_end_date',
            columnNames: ['end_date'],
          },
          {
            name: 'IDX_reserves_id_car',
            columnNames: ['id_vehicle'],
          },
          {
            name: 'IDX_reserves_id_user',
            columnNames: ['id_user'],
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reserves')
  }
}
