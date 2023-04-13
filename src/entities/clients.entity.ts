import {
    Column,
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { Transaction } from './transactions.entity';

export enum Type {
    BVN = 'bvn',
    NIN = 'nin',
    DRIVERS_LICENSE = 'drivers_license',
}

@Entity({ name: 'clients' })
export class Client {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    first_name: string 

    @Column()
    last_name: string;

    @Column()
    contact_number: string;

    @Column({ type: 'enum', enum: Type })
    id_type: Type

    @Column()
    id_value: string;

    @OneToMany(() => Transaction, (transaction) => transaction.client)
    transactions: Transaction[]

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP'
    })
    public created_at: Date; 

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP'
    })
    public updated_at: Date;
}