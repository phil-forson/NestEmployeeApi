import { Employee } from "src/employees/employee.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gender{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Employee,(employee) => employee.gender)
    employee: Employee[]
}