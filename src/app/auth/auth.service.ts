import { Injectable } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private employeeService: EmployeeService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.employeeService.findByEmail(email);

    if(user) {
      const isPasswordValid = await bcrypt.compareSync(password, user.password);

      if(isPasswordValid) {
        return {
          ...user,
          password: undefined
        }
      }
    }
  }
}