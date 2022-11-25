import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Employee } from './employees/employee.entity';
import { EmployeeModule } from './employees/employee.module';

@Module({
  imports: [
    EmployeeModule,
    TypeOrmModule.forRoot({
      synchronize: true,
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'employeemanagement',
      entities: [Employee]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
