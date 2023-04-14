import { Injectable } from '@nestjs/coMMon';
import { Repository } from 'typeorm';
import { Transaction } from 'src/entities/transactions.entity';
import { Client } from 'src/entities/clients.entity';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosInstance } from "axios";
const randomstring = require("randomstring")
import { PaymentsService } from '../payments/payments.service'
import { addDays, format } from 'date-fns'
import { generateInterest } from '../../helpers/utils';

@Injectable()
export class TransactionsService {
    protected readonly axiosInstance: AxiosInstance
    protected readonly customerPartnerId: string
    protected readonly drawdownId: string
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepo: Repository<Transaction>,
        @InjectRepository(Client)
        private readonly clientRepo: Repository<Client>,
        private readonly paymentsService: PaymentsService
    ){
        this.axiosInstance = axios.create({
            baseURL: process.env.B54_API,
            headers: {
                Authorization: process.env.B54_APP_KEY,
                "Content-Type": "application/json"
            }
        })
        this.customerPartnerId = process.env.B54_CUSTOMER_PARTNER_ID
        this.drawdownId = process.env.DRAWDOWN_ID
    }
    async create(createTransactionDto: CreateTransactionDto){
        // for reference
        const randomString = randomstring.generate({ length: 16, charset: 'alphanumeric' })
        const { 
          client_id, 
          amount_disbursed, 
          transaction_date, 
          tenor, 
          interest_rate, 
          number_of_installments } = createTransactionDto
        
        const client = await this.clientRepo.findOne({ 
          where:{
            id: client_id
          }
        })

        if(!client) {
          return {
            status: 'error',
            message: `Client with ID ${client_id} does not exist`
          }
        }

        const amount_expected = amount_disbursed + generateInterest(amount_disbursed, interest_rate, tenor)
        const dividedExpectedAmount = Number((amount_expected / number_of_installments).toFixed(2))
        const dividedTenor = Math.ceil(tenor / number_of_installments)

        const transactionRecordObject = {
          client_id,
          reference: randomString,
          transaction_date: new Date(transaction_date),
          amount_disbursed,
          interest_rate,
          tenor,
          amount_paid: 0,
          amount_outstanding: amount_expected,
          expected_payment_date: addDays(new Date(transaction_date), tenor),
          actual_payment_date: null,
          number_of_installments,
          amount_expected
        } 

        // Create transaction record
        const transactionRecord = this.transactionRepo.create(transactionRecordObject)

        // Create payment records
        let paymentRecordObjects = []
        let b54Payments = []
        let currentDate = new Date(transaction_date)
        let count = 0
        while(count < number_of_installments) {
          b54Payments.push({
            disbursement_date: format(new Date(transaction_date), "yyyy-MM-dd"),
            expected_payment_date: format(addDays(currentDate, dividedTenor), "yyyy-MM-dd"),
            amount: dividedExpectedAmount
          })
          
          paymentRecordObjects.push({
            transaction_reference: randomString,
            amount_paid: 0,
            status: "pending",
            amount_expected: dividedExpectedAmount,
            payment_index: count + 1
          })
          currentDate = addDays(currentDate, dividedTenor)
          count++
        }

        // Register transaction with B54
        const registerTransactionBody = {
          customer_partner_id: this.customerPartnerId,
          sector: "Lender",
          transactions: [{
            client,
            transaction_reference: randomString,
            disbursement_date: transaction_date,
            expected_payment_date: format(addDays(new Date(transaction_date), tenor), "yyyy-MM-dd"),
            reason: "Loan",
            amount_payable: amount_expected,
            financier: "B54"
          }],
          financed_transactions: [{
            transaction_reference: randomString,
            drawdown_id: this.drawdownId,
            amount: amount_disbursed,
            payments: b54Payments
          }]
        }
        const response = await this.axiosInstance.post(`transactions/register`, registerTransactionBody)

        if(response.data.status === 'success') {
          let paymentRecords = await this.paymentsService.create(paymentRecordObjects)
  
          let transactionRecords = await this.transactionRepo.save(transactionRecord)
          return {
            status: 'success',
            message: 'Transaction registered successfully',
            paymentsData: paymentRecords,
            transactionData: transactionRecords
          }
        }
        return {
          status: 'error',
          message: 'Transaction registration on B54 failed. Please try again.'
        }


    }

    async findOne(id: number){
        console.log(id)
    }

    async findByClientId(client_id: number){
        console.log(client_id);
    }
}
