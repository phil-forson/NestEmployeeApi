import { Employee } from "src/employees/employee.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Department extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dateCreated: Date

    @ManyToMany(() => Employee, (employee) => employee.department)
    employees: Employee[]
}