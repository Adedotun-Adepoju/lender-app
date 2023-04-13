import { IsNotEmpty, IsString } from 'class-validator';
import { AccountType } from 'src/entities/payment_accounts.entity';

export class CreatePaymentAccountDto {
    @IsString()
    @IsNotEmpty()
    account_type: AccountType;

    @IsString()
    @IsNotEmpty()
    account_identifier: string;

    bank: string;

    mobile_money_provider: string;
}