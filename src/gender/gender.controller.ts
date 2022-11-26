import { Controller, Get, Post, Body } from '@nestjs/common';
import { GenderService } from './gender.service';

@Controller('gender')
export class GenderController {

    constructor(  
        private genderService: GenderService
      ){

    }
    @Get()
    async getGenders(){
        return await this.genderService.getAllGenders()
    }

    @Post()
    async createGender(
        @Body('name') genderName
    ){
        return await this.genderService.addGender(genderName)
    }
}
