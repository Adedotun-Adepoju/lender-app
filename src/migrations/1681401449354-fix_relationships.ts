import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelationships1681401449354 implements MigrationInterface {
    name = 'FixRelationships1681401449354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_d5246d32594f1c88d385bff0ded"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_d5246d32594f1c88d385bff0ded"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "payment_account_id"`);
        await queryRunner.query(`ALTER TABLE "transfer_histories" DROP CONSTRAINT "FK_1a7d9cd4cec7b71d7ece0bb0fa3"`);
        await queryRunner.query(`ALTER TABLE "transfer_histories" DROP CONSTRAINT "REL_1a7d9cd4cec7b71d7ece0bb0fa"`);
        await queryRunner.query(`ALTER TABLE "transfer_histories" ADD CONSTRAINT "FK_1a7d9cd4cec7b71d7ece0bb0fa3" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transfer_histories" DROP CONSTRAINT "FK_1a7d9cd4cec7b71d7ece0bb0fa3"`);
        await queryRunner.query(`ALTER TABLE "transfer_histories" ADD CONSTRAINT "REL_1a7d9cd4cec7b71d7ece0bb0fa" UNIQUE ("transaction_id")`);
        await queryRunner.query(`ALTER TABLE "transfer_histories" ADD CONSTRAINT "FK_1a7d9cd4cec7b71d7ece0bb0fa3" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "payment_account_id" integer`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_d5246d32594f1c88d385bff0ded" UNIQUE ("payment_account_id")`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_d5246d32594f1c88d385bff0ded" FOREIGN KEY ("payment_account_id") REFERENCES "payment_accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
