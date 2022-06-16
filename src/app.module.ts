import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { WalletModule } from './wallet/wallet.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CqrsModule,
    WalletModule,
  ],
})
export class AppModule {}
