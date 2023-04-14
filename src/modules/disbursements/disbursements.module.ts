import { Module } from '@nestjs/common';
import { DisbursementsService } from './disbursements.service';
import { DisbursementsController } from './disbursements.controller';
import { TransferHistory } from 'src/entities/transfer_histories.entity';
import { PaymentAccount } from 'src/entities/payment_accounts.entity';
import { Client } from 'src/entities/clients.entity';
import { Transaction } from 'src/entities/transactions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([TransferHistory, PaymentAccount, Client, Transaction])
  ],
  providers: [DisbursementsService],
  controllers: [DisbursementsController]
})
export class DisbursementsModule {}
