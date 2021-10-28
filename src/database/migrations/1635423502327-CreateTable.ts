import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable1635423502327 implements MigrationInterface {
    name = 'CreateTable1635423502327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "price" numeric(5,2) NOT NULL DEFAULT '0', "detail" character varying NOT NULL, "stars" numeric(2,1) NOT NULL DEFAULT '0', "category" character varying NOT NULL, "image" character varying NOT NULL, "weight" character varying DEFAULT '50g', "brand" character varying, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
