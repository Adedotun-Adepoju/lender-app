import { MigrationInterface, QueryRunner } from "typeorm";

export class FixEnum1681428645183 implements MigrationInterface {
    name = 'FixEnum1681428645183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."payment_accounts_account_type_enum" RENAME TO "payment_accounts_account_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."payment_accounts_account_type_enum" AS ENUM('bank', 'mobile-money')`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" ALTER COLUMN "account_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" ALTER COLUMN "account_type" TYPE "public"."payment_accounts_account_type_enum" USING "account_type"::"text"::"public"."payment_accounts_account_type_enum"`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" ALTER COLUMN "account_type" SET DEFAULT 'bank'`);
        await queryRunner.query(`DROP TYPE "public"."payment_accounts_account_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_accounts_account_type_enum_old" AS ENUM('bank', 'mobile_money')`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" ALTER COLUMN "account_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" ALTER COLUMN "account_type" TYPE "public"."payment_accounts_account_type_enum_old" USING "account_type"::"text"::"public"."payment_accounts_account_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" ALTER COLUMN "account_type" SET DEFAULT 'bank'`);
        await queryRunner.query(`DROP TYPE "public"."payment_accounts_account_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."payment_accounts_account_type_enum_old" RENAME TO "payment_accounts_account_type_enum"`);
    }

}
