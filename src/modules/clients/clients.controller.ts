import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
    constructor(
        private readonly clientsService: ClientsService
    ) {}

    @Post()
    create(@Body() createClientDto: CreateClientDto ){
        return this.clientsService.create(createClientDto)
    }

    @Get()
    findAll(){
        return this.clientsService.findAll()
    }

    @Get('/b54-customers')
    async findCustomersFromB54(){
        return await this.clientsService.findRegisteredCustomersWithB54()
    }


}
