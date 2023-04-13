import {
    Column,
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    OneToMany, 
    OneToOne, 
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { Transaction } from './transactions.entity';
import { PaymentAccount } from './payment_accounts.entity';
import { TransferHistory } from './transfer_histories.entity';

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

    @OneToOne(() => PaymentAccount)
    @JoinColumn({ name: 'payment_account_id'})
    client: Client


    @Column()
    contact_number: string;

    @Column({ type: 'enum', enum: Type })
    id_type: Type

    @Column()
    id_value: string;

    @OneToMany(() => Transaction, (transaction) => transaction.client)
    transactions: Transaction[]

    @OneToMany(() => TransferHistory, (transferHistory) => transferHistory.client)
    transfer_histories: TransferHistory[]

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