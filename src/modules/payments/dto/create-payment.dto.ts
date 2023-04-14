import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Transaction } from 'src/entities/transactions.entity';

export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty()
    transaction_reference: string;

    @IsNumber()
    @IsNotEmpty()
    amount_paid: number;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNumber()
    @IsNotEmpty()
    amount_expected: number

    @IsNumber()
    @IsNotEmpty()
    payment_index: number

    @IsNotEmpty()
    transaction: Transaction
}