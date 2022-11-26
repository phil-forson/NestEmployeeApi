import { Department } from 'src/department/department.entity';
import { Gender } from 'src/gender/gender.entity';
import { Entity,PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne,  } from 'typeorm'

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

    @ManyToOne(() => Gender, (gender) => gender.employee)
    @JoinColumn()
    gender: Gender
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    datejoined: Date

    @ManyToMany(() => Department, (department) => department.employees)
    @JoinTable()
    department: Department[]
}