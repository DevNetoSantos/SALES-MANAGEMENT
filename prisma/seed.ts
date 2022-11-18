import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {

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

  const product = await prisma.product.create({
    data: {
      name: 'Sal',
      trader_comme: 'Bruno Levi',
      qts_item: '45',
      value_sale: '2,49',
      data_validity: '10/02/2022',
      due_date: '10/02/2030',
      companyId: 2
    }
  });
}

main()