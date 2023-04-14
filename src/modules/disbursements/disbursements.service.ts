import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentAccount } from 'src/entities/payment_accounts.entity';
import { TransferHistory } from 'src/entities/transfer_histories.entity';
import { Transaction } from 'src/entities/transactions.entity';
import { Repository } from 'typeorm';
import { CreatePaymentAccountDto } from './dto/create-payment-account.dto';
import { AccountType } from 'src/entities/payment_accounts.entity';
import { Client } from 'src/entities/clients.entity';
import { DisburseFundsDto } from './dto/disburse-funds.dto';
import axios, { AxiosInstance } from 'axios';
import { BANK_CODES } from '../../utils/constants';
import { StatusType } from 'src/entities/transfer_histories.entity';

@Injectable()
export class DisbursementsService {
    protected readonly axiosInstance: AxiosInstance
    protected readonly customerPartnerId: string
    constructor(
        @InjectRepository(PaymentAccount)
        private readonly paymentAccountrepo: Repository<PaymentAccount>,

        @InjectRepository(TransferHistory)
        private readonly transferHistoryRepo: Repository<TransferHistory>,

        @InjectRepository(Client)
        private readonly clientRepo: Repository<Client>,

        @InjectRepository(Transaction)
        private readonly transactionRepo: Repository<Transaction>,
    ){
        this.axiosInstance = axios.create({
            baseURL: process.env.B54_API,
            headers: {
                Authorization: process.env.B54_APP_KEY,
                "Content-Type": 'application/json'
            }
        })
        this.customerPartnerId = process.env.B54_CUSTOMER_PARTNER_ID
    }

    async createPaymentAccount(body: CreatePaymentAccountDto){
        const client = await this.clientRepo.findOne({ where: {
            id: body.client_id
        }})

       if(!client){
        throw new HttpException('Client Id specified does not exist', HttpStatus.BAD_REQUEST)
       }

       if (body.account_type == AccountType.BANK){
        let account: PaymentAccount = this.paymentAccountrepo.create({
            client: client,
            account_type: body.account_type,
            account_identifier: body.account_identifier,
            provider: body.provider
        })
        return await this.paymentAccountrepo.save(account);
       } else if(body.account_type == AccountType.MOBILE_MONEY){
        const account: PaymentAccount = this.paymentAccountrepo.create({
            client: client,
            account_type: body.account_type,
            account_identifier: body.account_identifier,
            provider: body.provider
        })
        return await this.paymentAccountrepo.save(account)
       } else {
           throw new HttpException('The account type submitted is not valid', HttpStatus.BAD_REQUEST)
       }

    }

    async disburseFunds(body: DisburseFundsDto){
        const transaction = await this.transactionRepo.findOneBy({ id: body.transaction_id });
        const client = await this.clientRepo.findOneBy({ id: body.client_id })

        const response = await this.sendFundsToPaymentAccount(body.client_id, 10);
        console.log(response)

        if(response.status == 'success'){
           const transfer: TransferHistory = await this.transferHistoryRepo.create({
               transaction: transaction,
               client: client,
               status: StatusType.PROCESSING
           })

           console.log(transfer);
        }

    }

    async sendFundsToPaymentAccount(client_id, amount){
        // fetch client 
        const client = await this.clientRepo.findOneBy({
            id: client_id
        });

        if(!client){
            throw new HttpException('Client Id does not exist', HttpStatus.BAD_REQUEST)
        }
        
        // fetch payment details 
        const paymentAccount = await this.paymentAccountrepo.findOne({ 
            where: { client: { id: client_id }}
        });

        if(!paymentAccount){
            throw new HttpException('Client does not have a payment account', HttpStatus.BAD_REQUEST)
        }

        if(paymentAccount.account_type == AccountType.BANK){
            const payload = {
                "name": `${client.first_name} ${client.last_name}`,
                "amount": amount,
                "account_type": paymentAccount.account_type,
                "mobile_no": client.contact_number,
                "account_number": paymentAccount.account_identifier,
                "bank_code": BANK_CODES[paymentAccount.provider.toLowerCase()]
            }

            let response = await this.axiosInstance.post(`/baas/customer-partner/${this.customerPartnerId}/withdraw`,
                payload
            );

            return response.data
           
        }else {
            const payload = {
                "amount": amount,
                "account_type": paymentAccount.account_type,
                "mobile_no": client.contact_number,
                "correspondent": paymentAccount.provider.toUpperCase(),
                "narration": `Transaction disbursement for ${client.first_name} ${client.last_name}`
            }
        
            let response = await this.axiosInstance.post(`/baas/customer-partner/${this.customerPartnerId}/withdraw`,
                payload
            );

            console.log(response)
        }
    }
}
