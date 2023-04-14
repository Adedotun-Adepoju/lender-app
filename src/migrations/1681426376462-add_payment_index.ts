import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaymentIndex1681426376462 implements MigrationInterface {
    name = 'AddPaymentIndex1681426376462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ADD "payment_index" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "payment_index"`);
    }

}
