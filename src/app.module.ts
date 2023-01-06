import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './app/auth/auth.module';
import { JwtAuthGuard } from './app/auth/guards/jwt-auth.guard';
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
  providers: [
/*     {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },  */
  ],
})
export class AppModule {}
