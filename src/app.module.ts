import { Module } from '@nestjs/common';
import { AuthModule } from './app/auth/auth.module';
import { ClientModule } from './app/client/client.module';
import { CompanyModule } from './app/company/company.module';
import { EmployeeModule } from './app/employee/employee.module';
import { ProductModule } from './app/product/product.module';
import { SaleModule } from './app/sale/sale.module';
@Module({
  imports: [
    EmployeeModule,
    ClientModule,
    CompanyModule,
    ProductModule,
    SaleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
