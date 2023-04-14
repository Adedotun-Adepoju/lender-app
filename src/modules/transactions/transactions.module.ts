import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { PaymentsService } from '../payments/payments.service'
import { Payment } from 'src/entities/payments.entity';
import { Transaction } from 'src/entities/transactions.entity';
import { Client } from 'src/entities/clients.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Client, Payment])
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, PaymentsService]
})
export class TransactionsModule {}
