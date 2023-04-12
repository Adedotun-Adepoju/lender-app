import {
    Column,
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'payments' })
export class Payment {
    @PrimaryGeneratedColumn()
    public id: number;

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