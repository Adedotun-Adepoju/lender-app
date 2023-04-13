import { IsNotEmpty, IsString } from 'class-validator';

export class DisburseFundsDto {
    @IsString()
    @IsNotEmpty()
    transaction_id: string;

    @IsString()
    @IsNotEmpty()
    client_id: string;
}