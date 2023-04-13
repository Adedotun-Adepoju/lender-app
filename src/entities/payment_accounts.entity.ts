import {
    Column, 
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'

export enum AccountType {
    BANK = 'bank',
    MOBILE_MONEY = 'mobile_money'
}

@Entity({ name: 'payment_accounts' })
export class PaymentAccount {
    @PrimaryGeneratedColumn()
    public id: number 

    @Column({
        type: 'enum',
        enum: AccountType,
        default: AccountType.BANK
    })
    public account_type: AccountType

    @Column()
    account_identifier: string

    @Column({ nullable: true })
    bank: string

    @Column({ nullable: true })
    mobile_money_provider: string;

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