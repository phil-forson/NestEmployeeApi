import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "./employee.entity";


@Injectable()
export class EmployeeService{

    constructor( 
        @InjectRepository(Employee)
        private empRepository: Repository<Employee>,
        ){  }

    async getEmployees(){
        return await this.empRepository.find()
    }

    async addEmployee(empName: string, empDept: string){
        const employee = new Employee()
        employee.name = empName
        employee.deptname = empDept
        await this.empRepository.save(employee)
        return employee.id
    }

    async getEmployeeById(empId){
        const employee = await this.empRepository.findOneBy({id: empId})
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
};