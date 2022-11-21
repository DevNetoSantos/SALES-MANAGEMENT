import { Injectable } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.employeeService.findByEmail(email);

    if(user) {
      const isPasswordValid = await bcrypt.compareSync(password, user.password);

      if(isPasswordValid) {
        return { ...user, password: undefined }
      }
    }

    throw new Error('Email anddres or password provided is incorrect.')
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      password: user.password,
      role: user.role
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}