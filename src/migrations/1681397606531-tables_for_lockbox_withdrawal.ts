import { MigrationInterface, QueryRunner } from "typeorm";

export class TablesForLockboxWithdrawal1681397606531 implements MigrationInterface {
    name = 'TablesForLockboxWithdrawal1681397606531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_accounts_account_type_enum" AS ENUM('bank', 'mobile_money')`);
        await queryRunner.query(`CREATE TABLE "payment_accounts" ("id" SERIAL NOT NULL, "account_type" "public"."payment_accounts_account_type_enum" NOT NULL DEFAULT 'bank', "account_identifier" character varying NOT NULL, "bank" character varying, "mobile_money_provider" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30d855e954ca88f8d6badbab40e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transfer_histories_status_enum" AS ENUM('processing', 'failed', 'success')`);
        await queryRunner.query(`CREATE TABLE "transfer_histories" ("id" SERIAL NOT NULL, "status" "public"."transfer_histories_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "transaction_id" integer, "client_id" integer, CONSTRAINT "REL_1a7d9cd4cec7b71d7ece0bb0fa" UNIQUE ("transaction_id"), CONSTRAINT "PK_49a031f89f282daee22c5420bae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "payment_account_id" integer`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_d5246d32594f1c88d385bff0ded" UNIQUE ("payment_account_id")`);
        await queryRunner.query(`ALTER TABLE "transfer_histories" ADD CONSTRAINT "FK_1a7d9cd4cec7b71d7ece0bb0fa3" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transfer_histories" ADD CONSTRAINT "FK_b8984863ec59d6438488711b5f4" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_d5246d32594f1c88d385bff0ded" FOREIGN KEY ("payment_account_id") REFERENCES "payment_accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_d5246d32594f1c88d385bff0ded"`);
        await queryRunner.query(`ALTER TABLE "transfer_histories" DROP CONSTRAINT "FK_b8984863ec59d6438488711b5f4"`);
        await queryRunner.query(`ALTER TABLE "transfer_histories" DROP CONSTRAINT "FK_1a7d9cd4cec7b71d7ece0bb0fa3"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_d5246d32594f1c88d385bff0ded"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "payment_account_id"`);
        await queryRunner.query(`DROP TABLE "transfer_histories"`);
        await queryRunner.query(`DROP TYPE "public"."transfer_histories_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment_accounts"`);
        await queryRunner.query(`DROP TYPE "public"."payment_accounts_account_type_enum"`);
    }

}
