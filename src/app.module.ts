import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Department } from './department/department.entity';
import { DepartmentModule } from './department/department.module';
import { Employee } from './employees/employee.entity';
import { EmployeeModule } from './employees/employee.module';
import { GenderController } from './gender/gender.controller';
import { Gender } from './gender/gender.entity';
import { GenderModule } from './gender/gender.module';
import { logger } from './middleware/logger.middleware';

@Module({
  imports: [
    EmployeeModule,
    DepartmentModule,
    TypeOrmModule.forRoot({
      synchronize: true,
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'employeemanagement',
      entities: [Employee, Department, Gender]
    }),
    GenderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger)
    .forRoutes(GenderController);
  }
}
