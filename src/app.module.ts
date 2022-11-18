import { Module } from '@nestjs/common';
import { ClientModule } from './app/client/client.module';
import { CompanyModule } from './app/company/company.module';
import { EmployeeModule } from './app/employee/employee.module';
import { ProductModule } from './app/product/product.module';
@Module({
  imports: [EmployeeModule, ClientModule, CompanyModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
