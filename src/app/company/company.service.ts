import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
        const data = {
      ...createCompanyDto
    };

    const companyExist = await this.prisma.company.findFirst({
      where: { cnpj: data.cnpj }
    });

    if(companyExist) {
      throw new Error("this company already exists");
    };

    await this.prisma.company.create({
      data: { name: data.name, cnpj: data.cnpj }
    });

    return {messege: 'company register successfully'}
  }

  async findAll() {
    const company = await this.prisma.company.findMany({
      include: {
        products: true
      }
    });
    
    return company;
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({where: {id}, include: {products: true} });

    if(!company) {
      throw new Error ('This company not found')
    }

    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.prisma.company.findUnique({ where: {id} });
    
    if(!company) {
      throw new Error ('this company not found')
    }

    const data = {
      ...updateCompanyDto
    }

    await this.prisma.company.update({where: {id}, data: {name: data.name, cnpj: data.cnpj}});

    return {messege: 'company update successfully'};
  }

  async remove(id: number) {
    const company = await this.prisma.company.findUnique({where: {id}});
    
    if(!company) {
      throw new Error ('this company not found')
    }

    await this.prisma.company.delete({where: {id}});

    return {messege: 'company delete successfully'}
  }
}
