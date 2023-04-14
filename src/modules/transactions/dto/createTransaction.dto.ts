import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    client_id: number;

    @IsNumber()
    @IsNotEmpty()
    amount_disbursed: number;

    @IsString()
    @IsNotEmpty()
    transaction_date: string;

    @IsNumber()
    @IsNotEmpty()
    tenor: number;

    @IsNumber()
    @IsNotEmpty()
    interest_rate: number

    @IsNumber()
    @IsNotEmpty()
    number_of_installments: number
}