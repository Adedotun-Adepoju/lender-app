import { Body, Controller, Post } from '@nestjs/common';
import { DisbursementsService } from './disbursements.service';
import { CreatePaymentAccountDto } from './dto/create-payment-account.dto';
import { DisburseFundsDto } from './dto/disburse-funds.dto';

@Controller('disbursements')
export class DisbursementsController {
    constructor(
        private readonly disbursementService: DisbursementsService
    ) {}

    @Post('/create-account')
    createPaymentAccount(@Body() createPaymentAccountDto: CreatePaymentAccountDto){
        return this.disbursementService.createPaymentAccount(createPaymentAccountDto)
    }

    @Post('/send-funds')
    disburseFunds(@Body() disburseFundsDto: DisburseFundsDto){
        return this.disbursementService.disburseFunds(disburseFundsDto)
    }
}
