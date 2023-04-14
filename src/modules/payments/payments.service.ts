import { Injectable } from '@nestjs/common';
import { Payment } from 'src/entities/payments.entity';
import { Transaction } from 'src/entities/transactions.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PayForTransactionDto } from './dto/payforTransaction.dto'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosInstance } from "axios";

@Injectable()
export class PaymentsService {
    protected readonly axiosInstance: AxiosInstance
    protected readonly customerPartnerId: string
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepo: Repository<Payment>,
        @InjectRepository(Transaction)
        private readonly transactionRepo: Repository<Transaction>
    ){
      this.axiosInstance = axios.create({
            baseURL: process.env.B54_API,
            headers: {
                Authorization: process.env.B54_APP_KEY,
                "Content-Type": "application/json"
            }
        })
        this.customerPartnerId = process.env.B54_CUSTOMER_PARTNER_ID
    }

    async create(createPaymentDto: CreatePaymentDto[]){
        let paymentRecords = []
        for(const paymentDto of createPaymentDto) {
          const { transaction_reference, amount_paid, status, amount_expected, payment_index } = paymentDto
          
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

    async payForTransaction(reqBody: PayForTransactionDto, transactionId: number) {
      console.log('BODY =>', reqBody)
      console.log('Transaction ID =>', transactionId)
      const { amount_paid, payment_index } = reqBody
      // Get transaction
      const transactionExists = await this.transactionRepo.findOne({
        where: {
          id: transactionId
        }
      })
      // If transaction does not exist, return error
      if(!transactionExists) {
        return {
          status: 'error',
          message: `Transaction with ID ${transactionId} does not exist`
        }
      }
      
      // Get payment with payment index
      const payment = await this.paymentRepo.findOne({
        where: {
          transaction: { id: transactionId},
          payment_index
        }
      })

      // If index is out of bounds, return error
      if(!payment) {
        return {
          status: 'error',
          message: `Payment record with transaction ID ${transactionId} and payment index of ${payment_index} does not exist`
        }
      }

      const { amount_outstanding } = transactionExists
      let newAmountOutstanding = amount_outstanding - Number(amount_paid)
      let status = "completed"
      if(amount_paid < payment.amount_expected) {
        status = "incomplete"
      }

      // Send payment record to B54
      const paymentPayload = {
        customer_partner_id: this.customerPartnerId,
        payments: [{
          transaction_reference: payment.transaction_reference,
          amount: amount_paid
        }]
      }
      const response = await this.axiosInstance.post(`/financing/bulk-payment`, paymentPayload)

      if(response.data.status === 'success') {
        // Update transaction record
        await this.transactionRepo.update({ id: transactionId }, {
          amount_paid,
          amount_outstanding: newAmountOutstanding >= 0 ? newAmountOutstanding : 0
        })
  
        // Update payment record
        await this.paymentRepo.update({ transaction: { id: transactionId}, payment_index}, {
          amount_paid,
          status
        })
  
        // Return payment record
        const updatedPaymentRecord = await this.paymentRepo.findOne({
          where: {
            transaction: { id: transactionId},
            payment_index
          }
        })
  
        return {
          status: 'success',
          message: 'Payment made successfully',
          data: updatedPaymentRecord
        }
      }

      return {
        status: 'error',
        message: 'Transaction payment on B54 failed. Please try again.'
      }

    }
}
