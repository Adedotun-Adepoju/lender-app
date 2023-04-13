import { Controller, Get, Post, Param, Delete, Body  } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/createTransaction.dto';

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService
    ) {}

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto){
        return this.transactionsService.create(createTransactionDto)
    }

    @Get(':id')
    findOn(@Param('id') id: number){
        return this.transactionsService.findOne(id);
    }

    @Get(':client_id')
    findByClientId(@Param('client_id') client_id: number){
        return this.transactionsService.findByClientId(client_id);
    }
}
