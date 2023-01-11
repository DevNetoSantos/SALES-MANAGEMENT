import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from '@prisma/client/runtime';
import { PrismaService } from '../../database/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {};
  
  async create(createClientDto: CreateClientDto) {
    const existEmail = await this.prisma.client.findFirst({where: {cpf: createClientDto.cpf}});
    
    if(existEmail) {
      throw new Error('this cpf already exists')
    }

    try {
      await this.prisma.client.create({data:{...createClientDto}});
    } catch (error) {
      throw new Error(error);
    }
  };

  async findAll() {
    const client = await this.prisma.client.findMany({
      include: { sales: true}
    });
    
    return client;
  };

  async findOne(id: number) {
    const client = await this.prisma.client.findFirst({
      where: { id }, include: { sales: true }
    });

    if(!client) {
      throw new Error("this client does not exist");
    };

    return client;
  };

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.client.findFirst({ where: { id } });

    const data = {
      ...updateClientDto
    };

    if(!client) {
      throw new Error("this client does not exist");
    };

    await this.prisma.client.update({where: {id}, data: {name: data.name, cpf: data.cpf}});

    return {messege: 'client update successfully'};
  };

  async remove(id: number) {
    const client = await this.prisma.client.findFirst({where: {id}});

    if(!client) {
      throw new Error("this client does not exist");
    };

    await this.prisma.client.delete({where: {id}});

    return {messege: 'client delete successfully'};
  };
}
