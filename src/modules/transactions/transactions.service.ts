import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from 'src/entities/transactions.entity';
import { Client } from 'src/entities/clients.entity';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosInstance } from "axios";
const randomstring = require("randomstring")

@Injectable()
export class TransactionsService {
    protected readonly axiosInstance: AxiosInstance
    protected readonly customerPartnerId: string
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepo: Repository<Transaction>,
        @InjectRepository(Client)
        private readonly clientRepo: Repository<Client>,
    ){
        this.axiosInstance = axios.create({
            baseURL: process.env.B54_API,
            headers: {
                Authorization: process.env.B54_App_Key,
                "Content-Type": "application/json"
            }
        })
        this.customerPartnerId = process.env.B54_CUSTOMER_PARTNER_ID
    }
    async create(createTransactionDto: CreateTransactionDto){
        // for reference
        const randomString = randomstring.generate({ length: 16, charset: 'alphanumeric' })
        const client = await this.clientRepo.findOne({ 

        })
    }

    async findOne(id: number){
        console.log(id)
    }

    async findByClientId(client_id: number){
        console.log(client_id);
    }
}
