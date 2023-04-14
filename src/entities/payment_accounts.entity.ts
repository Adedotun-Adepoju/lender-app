import {
    Column, 
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from 'typeorm'
import { Client } from './clients.entity'

export enum AccountType {
    BANK = 'bank',
    MOBILE_MONEY = 'mobile-money'
}

@Entity({ name: 'payment_accounts' })
export class PaymentAccount {
    @PrimaryGeneratedColumn()
    public id: number 

    @OneToOne(() => Client)
    @JoinColumn({ name: 'client_id'})
    client: Client

    @Column({
        type: 'enum',
        enum: AccountType,
        default: AccountType.BANK
    })
    public account_type: AccountType

    @Column()
    account_identifier: string

    @Column({ nullable: true })
    provider: string;

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