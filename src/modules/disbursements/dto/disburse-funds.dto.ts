import { IsNotEmpty, IsString } from 'class-validator';

export class DisburseFundsDto {
    @IsNotEmpty()
    transaction_id: number;

    @IsNotEmpty()
    client_id: number;
}