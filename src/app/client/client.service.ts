import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}
  
  async create(createClientDto: CreateClientDto) {
    const data = {
      ...createClientDto
    }

    const clientExist = await this.prisma.client.findFirst({
      where: {
        cpf: data.cpf
      }
    })

    if(clientExist) {
      throw new Error("this client already exists");
    }

    await this.prisma.client.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        employeeId: data.employeeId
      },
    });

    return {messege: 'client reguster successfully'}
  }

  async findAll() {
    const client = await this.prisma.client.findMany({
      include: {
        employee: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    
    return client;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
