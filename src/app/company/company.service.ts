import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.prisma.company.create({
        data: {...createCompanyDto}
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  async findAll() {
    try {
      return await this.prisma.company.findMany({ include: { products: true } });
    } catch (error) {
      throw new NotFoundException();
    }
  };

  async findOne(id: number) {
    try {
      return await this.prisma.company.findUniqueOrThrow( {where:{id}, include: {products: true}} );
    } catch (error) {
      throw new NotFoundException();
    }
  };

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      return await this.prisma.company.update({
        where: { id },
        data: { ...updateCompanyDto }
      });
    } catch (error) {
      throw new NotFoundException();
    }
  };

  async remove(id: number) {
    try {
      await this.prisma.company.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  };
}
