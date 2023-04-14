import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelationsips1681403498292 implements MigrationInterface {
    name = 'FixRelationsips1681403498292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_accounts" ADD "client_id" integer`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" ADD CONSTRAINT "UQ_edf1ce03a7c23e113b54157c80a" UNIQUE ("client_id")`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" ADD CONSTRAINT "FK_edf1ce03a7c23e113b54157c80a" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_accounts" DROP CONSTRAINT "FK_edf1ce03a7c23e113b54157c80a"`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" DROP CONSTRAINT "UQ_edf1ce03a7c23e113b54157c80a"`);
        await queryRunner.query(`ALTER TABLE "payment_accounts" DROP COLUMN "client_id"`);
    }

}
