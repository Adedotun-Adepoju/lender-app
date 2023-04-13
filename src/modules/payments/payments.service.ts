import { Injectable } from '@nestjs/common';
import { Payment } from 'src/entities/payments.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepo: Repository<Payment>
    ){

    }

    async create(createPaymentDto: CreatePaymentDto[]){
        console.log("here")
    }

    async findOne(id: number){
        console.log(id)
    }

    async findByTransactionReference(transaction_reference: string){
        console.log(transaction_reference)
    }
}
