import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { AccountType } from 'src/entities/payment_accounts.entity';

export class CreatePaymentAccountDto {
    @IsNotEmpty()
    client_id: number;

    @IsString()
    @IsNotEmpty()
    account_type: AccountType;

    @IsString()
    @IsNotEmpty()
    account_identifier: string;

    @IsString()
    @IsOptional()
    provider: string;
}