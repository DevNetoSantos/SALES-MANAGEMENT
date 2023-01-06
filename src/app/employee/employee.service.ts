import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(private  prisma: PrismaService) {};

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
       return await this.prisma.employee.create({
        data: {
          ...createEmployeeDto,
          password: await bcrypt.hash(createEmployeeDto.password, 10)
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  async findAll() {
    try {
      return await this.prisma.employee.findMany({
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          name: true,
          lastname: true,
          email: true,
          role: true
        },
        orderBy: {
          id: 'desc'
        },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  };

  async findOne(id: number) {
    try {
      return await this.prisma.employee.findUnique({where: {id}});
    } catch (error) {
      throw new NotFoundException();
    }
  };

  async findByEmail(email: string) {
    return await this.prisma.employee.findFirstOrThrow({where: {email}});
  };

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      return await this.prisma.employee.update({
        where: { id },
        data: {
          ...updateEmployeeDto,
          password: await bcrypt.hash(updateEmployeeDto.password, 10)
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  async remove(id: number) {
    await this.findOne(id);

    try {
      await this.prisma.employee.delete({where: {id}});
    } catch (error) {
      throw new Error();
    }
  };
};
