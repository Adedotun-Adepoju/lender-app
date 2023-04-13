import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAmountExpected1681393626658 implements MigrationInterface {
    name = 'AddAmountExpected1681393626658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ADD "amount_expected" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "amount_expected" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "amount_expected"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "amount_expected"`);
    }

}
