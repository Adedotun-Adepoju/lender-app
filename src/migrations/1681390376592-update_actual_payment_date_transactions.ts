import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateActualPaymentDateTransactions1681390376592 implements MigrationInterface {
    name = 'UpdateActualPaymentDateTransactions1681390376592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "actual_payment_date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "actual_payment_date" SET NOT NULL`);
    }

}
