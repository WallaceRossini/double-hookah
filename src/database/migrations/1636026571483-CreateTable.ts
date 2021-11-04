import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable1636026571483 implements MigrationInterface {
    name = 'CreateTable1636026571483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "stars"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "stars" numeric(2,1) NOT NULL DEFAULT '0'`);
    }

}
