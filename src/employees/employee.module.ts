import { Module } from "@nestjs/common";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { TypeOrmModule } from '@nestjs/typeorm'
import { Employee } from "./employee.entity";
import { Department } from "src/department/department.entity";
import { Gender } from "src/gender/gender.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Employee, Department, Gender])],
    controllers: [EmployeeController],
    providers: [EmployeeService],
    exports: [TypeOrmModule]
})
export class EmployeeModule{};