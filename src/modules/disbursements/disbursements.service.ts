import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentAccount } from 'src/entities/payment_accounts.entity';
import { TransferHistory } from 'src/entities/transfer_histories.entity';
import { Repository } from 'typeorm';
import { CreatePaymentAccountDto } from './dto/create-payment-account.dto';
import { AccountType } from 'src/entities/payment_accounts.entity';

@Injectable()
export class DisbursementsService {
    constructor(
        @InjectRepository(PaymentAccount)
        private readonly paymentAccountrepo: Repository<PaymentAccount>,

        @InjectRepository(TransferHistory)
        private readonly transferHistoryRepo: Repository<TransferHistory>
    ){

    }

    async createPaymentAccount(body: CreatePaymentAccountDto){
       if (body.account_type == AccountType.BANK){
        const account: PaymentAccount = this.paymentAccountrepo.create({
            account_type: body.account_type,
            account_identifier: body.account_identifier,
            bank: body.account_type
        })
        console.log(account)
       } else if(body.account_type == AccountType.MOBILE_MONEY){
        const account: PaymentAccount = this.paymentAccountrepo.create({
            account_type: body.account_type,
            account_identifier: body.account_identifier,
            bank: body.account_type
        })
       } else {
           throw new HttpException('The account type submitted is not valid', HttpStatus.BAD_REQUEST)
       }

    }

    async disburseFunds(body){

    }
}
