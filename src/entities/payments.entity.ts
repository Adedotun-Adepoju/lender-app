import {
    Column,
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Transaction } from './transactions.entity';

@Entity({ name: 'payments' })
export class Payment {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Transaction, (transaction) => transaction.payments)
    @JoinColumn({ name: 'transaction_id'})
    transaction: Transaction

    @Column()
    transaction_reference: string 

    @Column()
    amount_paid: number;

    @Column()
    status: string;

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