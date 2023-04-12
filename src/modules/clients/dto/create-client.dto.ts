import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    contact_number: string;

    @IsString()
    @IsNotEmpty()
    id_type: string;

    @IsString()
    @IsNotEmpty()
    id_value: string
}