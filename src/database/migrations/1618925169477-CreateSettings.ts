import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSettings1618921458383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "settings",
                columns: [
                    {
                        name: "id",
                        type: "UUid",
                        isPrimary: true
                    }, 
                    {
                        name: "Username",
                        type: "varchar"
                    }, 
                    {
                        name: "chat",
                        type: "boolean",
                        default: true
                    }, 
                    {
                        name: "Updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings")
    }

}