import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const data = {
      ...createEmployeeDto,
      password: await bcrypt.hash(createEmployeeDto.password, 10)
    }

    const employeeExist = await this.prisma.employee.findFirst({
      where: {
        email: data.email
      }
    })

    if(employeeExist) {
      throw new Error("this email already exists");
    }

    await this.prisma.employee.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: data.password
      }
    });

    return {messege: 'employee reguster successfully'}
  }

  async findAll() {
    const employees = await this.prisma.employee.findMany({
      select: {
        createdAt: true,
        updatedAt: true,
        name: true,
        lastname: true,
        email: true,
        role: true
      },
      orderBy: {
        id: 'desc'
      }
    });
    return employees;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
