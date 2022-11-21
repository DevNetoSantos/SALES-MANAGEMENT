import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeeModule } from '../employee/employee.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [EmployeeModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
