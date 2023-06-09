import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './modules/clients/clients.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { DisbursementsModule } from './modules/disbursements/disbursements.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { ConfigModule } from '@nestjs/config';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ClientsModule,
    TransactionsModule,
    PaymentsModule,
    DisbursementsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
