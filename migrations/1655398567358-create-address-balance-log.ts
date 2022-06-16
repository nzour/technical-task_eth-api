import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAddressBalanceLog1655398567358
  implements MigrationInterface
{
  name = 'createAddressBalanceLog1655398567358';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address_balance_logs" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL, "address" character varying NOT NULL, "ip" character varying NOT NULL, "balanceEth" double precision NOT NULL, "balanceUsdt" double precision NOT NULL, CONSTRAINT "PK_b3a89542c5d2d67fb7bd5e8e2be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a8678cd225e24196e78b977ac1" ON "address_balance_logs" ("address") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a8678cd225e24196e78b977ac1"`,
    );
    await queryRunner.query(`DROP TABLE "address_balance_logs"`);
  }
}
