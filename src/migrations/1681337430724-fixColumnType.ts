import { MigrationInterface, QueryRunner } from "typeorm";

export class FixColumnType1681337430724 implements MigrationInterface {
    name = 'FixColumnType1681337430724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "last_name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "last_name" integer NOT NULL`);
    }

}
