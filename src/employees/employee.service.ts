import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "src/department/department.entity";
import { Gender } from "src/gender/gender.entity";
import { Repository } from "typeorm";
import { Employee } from "./employee.entity";


@Injectable()
export class EmployeeService{

    constructor( 
        @InjectRepository(Employee)
        private empRepository: Repository<Employee>,

        @InjectRepository(Department)
        private deptRepository: Repository<Department>,

        @InjectRepository(Gender)
        private genderRepository: Repository<Gender>
        ){  }

    async getEmployees(){
        return await this.empRepository.find({
            relations: {
                department: true,
                gender: true
            }
        })
    }

    async addEmployee(empName: string, empDept: string, empGender: string){
        const employee = new Employee()
        employee.name = empName
        employee.deptname = empDept

        const gender = await this.genderRepository.findOneBy({ 
            name: empGender
        })

        employee.gender = gender

        const department = await this.deptRepository.findOneBy({
            name: empDept
        })

        employee.department = [department]
        await this.empRepository.save(employee) 
        return department
    }

    async getEmployeeById(empId){
        const employee = await this.empRepository.findOne({
            where: {
                id: empId
            },
            relations: {
                department: true,
            }
        })
        return {employee: employee}
    }

    async updateEmployeeInfo(id, name, department){
        const employeeToUpdate = await this.empRepository.findOneBy({id: id})
        if(name){
            employeeToUpdate.name = name
        }
        if(department){
            employeeToUpdate.deptname = department
        }
        try{
            employeeToUpdate.save()
        }
        catch(error){
            return error
        }

        return { success: true }

    }

    async deleteEmployee(id){
        const employeeToDelete = await this.empRepository.findOneBy({ id: id})
        return await this.empRepository.remove(employeeToDelete)
    }

    async addDepartment(id, department){
        const deptment = await this.deptRepository.findOneBy({
            name: department
        })
        const employee = await this.empRepository.findOne({
            where: {
                id: id
            },
            relations: {
                department: true
            }
        })

        employee.department.push(deptment)
       
       
        return await this.empRepository.save(employee)
    }

    async deleteEmployeeDepartment(empId, deptName){
        const employee = await this.empRepository.findOne({
            where: {
                id: empId
            },
            relations: {
                department: true
            }
        })
        const deptToBeDeleted = await this.deptRepository.findOneBy({name: deptName})
        const deptToDelete = employee.department.find((dept: any) => { return dept.id === deptToBeDeleted.id})

        for(var i = 0; i < employee.department.length; i++){
            if (employee.department[i] === deptToDelete){
                employee.department.splice(i, 1)
            }
        }
        
        return await this.empRepository.save(employee)
    }
};