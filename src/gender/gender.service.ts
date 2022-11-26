import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './gender.entity';

@Injectable()
export class GenderService {
    constructor(
        @InjectRepository(Gender)
        private genderRepository: Repository<Gender>
    ){  }

    async getAllGenders(){
        return await this.genderRepository.find()
    }

    async addGender(name){
        const gender = new Gender()
        gender.name = name
        return await this.genderRepository.save(gender)
    }
}
