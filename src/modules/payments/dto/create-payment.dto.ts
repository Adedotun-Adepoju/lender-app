import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

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
}