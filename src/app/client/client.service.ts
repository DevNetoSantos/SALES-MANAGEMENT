import { Injectable, NotFoundException } from '@nestjs/common';
import { json } from 'express';
import { PrismaService } from '../../database/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {};
  
  async create(createClientDto: CreateClientDto) {

    try {
      return await this.prisma.client.create({data:{...createClientDto}});
    } catch (error) {
      throw new Error(error);
    };
  };

  async findAll() {
    try {
      return await this.prisma.client.findMany({include: {sales: true}});
    } catch (error) {
      throw new NotFoundException();
    }
  };

  async findOne(id: number) {
    try {
      return await this.prisma.client.findUniqueOrThrow({
        where: { id }, include: { sales: true }
      });
    } catch (error) {
      throw new NotFoundException();
    }
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
    await this.findOne(id);

    try {
      await this.prisma.client.delete({where: {id}});
    } catch (error) {
      throw new Error();
    }
  };
}
