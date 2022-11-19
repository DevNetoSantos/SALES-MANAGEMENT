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

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({where: {id}, include: {company: true}});
    
    if(!product) {
      throw new Error ('this product not found')
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({where: {id}});

    if(!product) {
      throw new Error ('this product not found')
    }

    const data = updateProductDto;

    await this.prisma.product.update({
      where: {id},
      data: {
        name: data.name,
        trader_comme: data.trader_comme,
        qts_item: data.qnts_item,
        value_sale: data.value_sale,
        data_fabrication: data.data_fabrication,
        due_date: data.due_date,
        companyId: data.companyId
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
