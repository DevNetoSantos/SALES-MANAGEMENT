import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleDto: CreateSaleDto) {
    const data = createSaleDto;

    await this.prisma.sale.create({
      data: {
        qts_product: data.qts_product,
        clientId: data.clientId,
        employeeId: data.employeeId,
        productId: data.productId
      },
      include: {
        client: true,
        employee: true,
        product: true
      }
    });

    return {messege: 'successful sale '}
  }

  async findAll() {
    const sales = await this.prisma.sale.findMany({
      include: {
        product: {
          select: {
            name: true,
            cod_reference: true,
            value_sale: true,
            data_fabrication: true,
            due_date: true
          }
        },
        employee: {
          select: {
            name: true,
            lastname: true,
          }
        },
        client: {
          select: {
            name: true,
            cpf: true
          }
        }
      }
    });

    return sales;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
