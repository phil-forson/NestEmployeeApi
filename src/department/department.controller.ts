import { Controller, Get, Param, Post, Body, Patch, Delete } from "@nestjs/common";
import { DeleteDateColumn } from "typeorm";
import { brotliDecompressSync } from "zlib";
import { DepartmentService } from "./department.service";



@Controller('departments')
export class DepartmentController {

    constructor( private deptService: DepartmentService){  }

    @Get()
    async getDepartments(){
        return await this.deptService.getAllDepartments()
    }

    @Get(':id')
    async getDepartmentById(
        @Param('id') deptId
    ){
        return await this.deptService.getDepartmentById(deptId)
    }

    @Post('add')
    async addDepartment(
        @Body('name') deptName
    ){
        return await this.deptService.createDepartment(deptName)
    }

    @Delete(':id')
    async deleteDepartment(
        @Param(':id') deptId
    ){
        return await this.deptService.deleteDepartmentById(deptId)
    }

    @Patch(':id')
    async updateDepartmentInfo(
        @Param('id') deptId,
        @Body('name') deptName
    ){
        this.deptService.updateDepartment(deptId, deptName)
    }


}