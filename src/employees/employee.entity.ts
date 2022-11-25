import { Entity,PrimaryGeneratedColumn, Column, BaseEntity,  } from 'typeorm'

@Entity()
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({
        length: 300
    })
    deptname: string
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    datejoined: Date
}