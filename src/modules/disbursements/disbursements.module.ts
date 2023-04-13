import { Module } from '@nestjs/common';
import { DisbursementsService } from './disbursements.service';
import { DisbursementsController } from './disbursements.controller';
import { TransferHistory } from 'src/entities/transfer_histories.entity';
import { PaymentAccount } from 'src/entities/payment_accounts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([TransferHistory, PaymentAccount])
  ],
  providers: [DisbursementsService],
  controllers: [DisbursementsController]
})
export class DisbursementsModule {}
