import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/entities/clients.entity';
import { CreateClientDto } from './dto/create-client.dto';
import axios, { AxiosInstance } from "axios";
@Injectable()
export class ClientsService {

    protected readonly axiosInstance: AxiosInstance
    protected readonly customerPartnerId: string
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ){
        this.axiosInstance = axios.create({
            baseURL: process.env.B54_API,
            headers: {
                Authorization: process.env.B54_APP_KEY,
                "Content-Type": 'application/json'
            }
        })
        this.customerPartnerId = process.env.B54_CUSTOMER_PARTNER_ID
    }
    async create(createClientDto: CreateClientDto) {
        try {
            const {
                id_type: unique_id_type,
                id_value: unique_id,
                first_name,
                last_name,
                contact_number
            } = createClientDto;

            // check if client exists 
            const client = await this.clientRepository.findOne({
                where:{
                    id_type: unique_id_type,
                    id_value: unique_id
                }
            });

            if(client){
                return client
            }
            
            let response = await this.axiosInstance.post(`/customer_partners/${this.customerPartnerId}/customers`,{
                first_name, 
                last_name,
                unique_id_type, 
                unique_id, 
                contact_number
            });
            if(response.data.status != 'success'){
                throw new HttpException('An error occured when creating the customer', HttpStatus.INTERNAL_SERVER_ERROR)
            }

            let newClient = this.clientRepository.create(createClientDto)
            return await this.clientRepository.save(newClient)  

        } catch(error){
            return error.message
        }
    }

    async findAll() {
        console.log("yup")
    }

    async findOne(id: number){
        console.log(id)
    }

    async findRegisteredCustomersWithB54(){
        console.log("here")
        let response = await this.axiosInstance.get(`/customer_partners/${this.customerPartnerId}/customers`)
        console.log(response.data)
    }
}
