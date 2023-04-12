import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
    constructor(
        private readonly paymentsService: PaymentsService
    ) {}

    @Post()
    create(@Body() createPaymentDto: CreatePaymentDto[]){
        return this.paymentsService.create(createPaymentDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.paymentsService.findOne(id)
    }

    @Get(':transaction_reference')
    findByTransactionReference(@Param('transaction_reference') transaction_reference: string){
        return this.paymentsService.findByTransactionReference(transaction_reference)
    }
}
