import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { EmployeeService } from "./employee.service";


@Controller('employee')
export class EmployeeController{
    constructor(private employeeService: EmployeeService){  }

    @Post('add')
    async addEmployee(
        @Body('name') empName: string,
        @Body('department') empDept: string,
        @Body('gender') empGender: string
    ){
        const generatedId = await this.employeeService.addEmployee(empName, empDept, empGender)
        return { id : generatedId}

    }

    @Get()
    async getEmployees(): Promise<any>{
        return await this.employeeService.getEmployees()
    }

    @Get(':id')
    async getSingleEmployee(
        @Param('id') empId
    ){
        return await this.employeeService.getEmployeeById(empId)
    }



    @Patch(':id')
    async updateEmployee(
        @Param('id') empId,
        @Body('name') empName,
        @Body('department') empDept
    ){
        const employee =  this.employeeService.updateEmployeeInfo(empId, empName, empDept)
        return { employee: employee}
    }

    @Delete(':id')
    async deleteEmployee(
        @Param('id') empId
    ){
        return await this.employeeService.deleteEmployee(empId)
    }

    @Post('/dept/:empId')
    async addDept(
        @Param('empId') empId,
        @Body('department') department
    ){
        return await this.employeeService.addDepartment(empId, department)
    }

    @Delete('/dept/:empId')
    async deleteDept(
        @Param('empId') empId,
        @Body('department') department
    ){
        return await this.employeeService.deleteEmployeeDepartment(empId, department)
    }
}