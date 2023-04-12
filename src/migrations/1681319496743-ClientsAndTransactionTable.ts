import { MigrationInterface, QueryRunner } from "typeorm";

export class ClientsAndTransactionTable1681319496743 implements MigrationInterface {
    name = 'ClientsAndTransactionTable1681319496743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "client_id" integer NOT NULL, "reference" character varying NOT NULL, "transaction_date" TIMESTAMP NOT NULL, "amount_disbursed" double precision NOT NULL, "interest_rate" double precision NOT NULL, "tenor" integer NOT NULL, "amount_paid" double precision NOT NULL, "amount_outstanding" double precision NOT NULL, "expected_payment_date" TIMESTAMP NOT NULL, "actual_payment_date" TIMESTAMP NOT NULL, "number_of_installments" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."clients_id_type_enum" AS ENUM('bvn', 'nin', 'drivers_license')`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" integer NOT NULL, "contact_number" character varying NOT NULL, "id_type" "public"."clients_id_type_enum" NOT NULL, "id_value" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "transaction_id" integer`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_3c324ca49dabde7ffc0ef64675d" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_ebb352c973d8a85e8779a15ff35" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_ebb352c973d8a85e8779a15ff35"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_3c324ca49dabde7ffc0ef64675d"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TYPE "public"."clients_id_type_enum"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
