import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePaymountAmountType1681481192603 implements MigrationInterface {
    name = 'ChangePaymountAmountType1681481192603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "amount_expected"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "amount_expected" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "amount_expected"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "amount_expected" integer`);
    }

}
