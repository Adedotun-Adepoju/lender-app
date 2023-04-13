import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'src/entities/clients.entity';

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
    id_type: Type;

    @IsString()
    @IsNotEmpty()
    id_value: string
}