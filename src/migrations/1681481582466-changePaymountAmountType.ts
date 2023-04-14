import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePaymountAmountType1681481582466 implements MigrationInterface {
    name = 'ChangePaymountAmountType1681481582466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "amount_expected"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "amount_expected" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "amount_expected"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "amount_expected" integer`);
    }

}
