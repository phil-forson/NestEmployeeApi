import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private deptRepository: Repository<Department>
    ){  }

    async getAllDepartments(){
        return await this.deptRepository.find()
    }

    async getDepartmentById(id: number){
        return await this.deptRepository.findOneBy({
            id: id
        })
    }

    async deleteDepartmentById(id: number){
        const deptToDelete = await this.deptRepository.findOneBy({
            id: id
        })
        return await this.deptRepository.remove(deptToDelete)
    }

    async createDepartment(name){
        const department = new Department()
        department.name = name
        await this.deptRepository.save(department)
        return {id: department.id}
    }

    async updateDepartment(id, name){
        const department = await this.deptRepository.findOneBy({
            id: id
        })
        department.name = name
        return department.save()
    }
}