import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid';
const prisma = new PrismaClient()

const main = async () => {
  const hasCode = nanoid();

/*   const employee = await prisma.employee.create({
    data: {
      name: 'Raimundo',
      lastname: 'neto',
      email: 'neto@gmail.com',
      password: '123456789',
    }
  }); */

/*   const client = await prisma.client.create({
    data: {
      name: 'João',
      cpf: '45896235147',
    }
  });   */

/*   const product = await prisma.product.create({
    data: {
      name: 'Banana',
      trader_comme: 'Netim Santos',
      qts_item: '200',
      value_sale: '5,00',
      cod_reference: hasCode,
      data_fabrication: '10/02/2022',
      due_date: '10/02/2022',
      companyId: 2
    }
  }); */
}

main()