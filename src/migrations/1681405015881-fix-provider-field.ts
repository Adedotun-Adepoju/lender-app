import { MigrationInterface, QueryRunner } from "typeorm";

export class FixProviderField1681405015881 implements MigrationInterface {
    name = 'FixProviderField1681405015881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_accounts" DROP COLUMN "bank"`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" DROP COLUMN "mobile_money_provider"`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" ADD "provider" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_accounts" DROP COLUMN "provider"`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" ADD "mobile_money_provider" character varying`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" ADD "bank" character varying`);
    }

}
