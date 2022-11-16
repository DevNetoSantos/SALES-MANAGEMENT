import { Module } from '@nestjs/common';
import { ClientModule } from './app/client/client.module';
import { EmployeeModule } from './app/employee/employee.module';
@Module({
  imports: [EmployeeModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
