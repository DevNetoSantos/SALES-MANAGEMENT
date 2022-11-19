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
        pay_value: data.pay_value,
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

  async findOne(id: number) {
    const sale = await this.prisma.sale.findUnique({where: {id},
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

    if(!sale) {
      throw new Error ('this sale not found')
    }

    return sale;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
