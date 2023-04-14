import {
    Column,
    CreateDateColumn,
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToOne, 
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { Client } from './clients.entity'
import { Transaction } from './transactions.entity';

export enum StatusType {
    PROCESSING = 'processing',
    FAILED = 'failed',
    SUCCESS = 'success'
}

@Entity({ name: 'transfer_histories'})
export class TransferHistory {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Transaction, (transaction) => transaction.transfer_histories)
    @JoinColumn({ name: 'transaction_id'})
    transaction: Transaction

    @ManyToOne(() => Client, (client) => client.transfer_histories)
    @JoinColumn({ name: 'client_id'})
    client: Client

    @Column({
        type: 'enum', 
        enum: StatusType
    })
    status: StatusType

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