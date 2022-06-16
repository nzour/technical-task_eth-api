import { MigrationInterface, QueryRunner } from 'typeorm';

export class createWallet1655380672167 implements MigrationInterface {
  name = 'createWallet1655380672167';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wallets" ("id" uuid NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f907d5fd09a9d374f1da4e13bd" ON "wallets" ("address") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f907d5fd09a9d374f1da4e13bd"`,
    );
    await queryRunner.query(`DROP TABLE "wallets"`);
  }
}
