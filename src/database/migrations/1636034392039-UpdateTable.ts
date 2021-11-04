import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTable1636034392039 implements MigrationInterface {
    name = 'UpdateTable1636034392039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "category" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_c3932231d2385ac248d0888d955" FOREIGN KEY ("category") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_c3932231d2385ac248d0888d955"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "category" SET NOT NULL`);
    }

}
