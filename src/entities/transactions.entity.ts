import {
    Column,
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    OneToMany
} from 'typeorm'
import { Client } from './clients.entity';
import { Payment } from './payments.entity';
import { TransferHistory } from './transfer_histories.entity';

@Entity({ name: 'transactions' })
export class Transaction {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Client, (client) => client.transactions)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column()
    client_id: number 

    @Column()
    reference: string;

    @Column({ type: 'timestamp' })
    transaction_date: Date

    @Column({ type: 'float'})
    amount_disbursed: number; 

    @Column({ type: 'float'})
    interest_rate: number; 

    @Column()
    tenor: number; 

    @Column({ type: 'float'})
    amount_paid: number;

    @Column({ type: 'float' })
    amount_outstanding: number;

    @Column({ type: 'timestamp' })
    expected_payment_date: Date;

    @Column({ type: 'timestamp', nullable: true })
    actual_payment_date: Date;

    @Column()
    number_of_installments: number

    @Column({ nullable: true, type: 'float' })
    amount_expected: number

    @OneToMany(() => Payment, (payment) => payment.transaction)
    payments: Payment[]

    @OneToMany(() => TransferHistory, (transferHistory) => transferHistory.transaction)
    transfer_histories: TransferHistory[];

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