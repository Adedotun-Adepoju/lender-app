import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class PayForTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount_paid: number;

  @IsNumber()
  @IsNotEmpty()
  payment_index: number
}