import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { PaymentsService } from '../payments/payments.service'
import { DisbursementsService } from '../disbursements/disbursements.service';
import { Payment } from 'src/entities/payments.entity';
import { Transaction } from 'src/entities/transactions.entity';
import { Client } from 'src/entities/clients.entity';
import { PaymentAccount } from 'src/entities/payment_accounts.entity';
import { TransferHistory } from 'src/entities/transfer_histories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Client, Payment, PaymentAccount, TransferHistory])
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, PaymentsService, DisbursementsService]
})
export class TransactionsModule {}
