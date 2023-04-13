import { Injectable } from '@nestjs/common';
import { Payment } from 'src/entities/payments.entity';
import { Transaction } from 'src/entities/transactions.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepo: Repository<Payment>,
        @InjectRepository(Transaction)
        private readonly transactionRepo: Repository<Transaction>
    ){

    }

    async create(createPaymentDto: CreatePaymentDto[]){
        let paymentRecords = []
        for(const paymentDto of createPaymentDto) {
          const { transaction_reference, amount_paid, status, amount_expected } = paymentDto
          
          // Check if transaction exists
          const transactionExists = this.transactionRepo.findOne({
            where: {
              reference: transaction_reference
            }
          })

          if(!transactionExists) {
            return {
              status: 'error',
              message: `Transaction with reference ${transaction_reference} does not exist`
            }
          }

          // Create payment record
          let paymentRecord = this.paymentRepo.create(paymentDto)
          paymentRecord = await this.paymentRepo.save(paymentRecord)
          paymentRecords.push(paymentRecord)
        }
        return paymentRecords
    }

    async findOne(id: number){
        console.log(id)
    }

    async findByTransactionReference(transaction_reference: string){
        console.log(transaction_reference)
    }
}
