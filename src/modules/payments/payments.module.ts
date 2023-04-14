import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../../entities/payments.entity';
import { Transaction } from '../../entities/transactions.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Transaction])],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}
