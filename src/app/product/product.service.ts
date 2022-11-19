import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const data = createProductDto;
    const hasCode = nanoid();

    await this.prisma.product.create({
      data: {
        name: data.name,
        cod_reference: hasCode,
        trader_comme: data.trader_comme,
        qts_item: data.qnts_item,
        value_sale: data.value_sale,
        data_fabrication: data.data_fabrication,
        due_date: data.due_date,
        companyId: data.companyId
      },
      include: {
        company: true
      }
    });

    return {messege: 'product create successfully'};
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        company: true
      }
    });
    
    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
