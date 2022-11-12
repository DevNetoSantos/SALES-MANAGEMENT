import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {

  const employee = await prisma.employee.create({
    data: {
      name: 'Raimundo',
      lastname: 'neto',
      email: 'neto@gmail.com',
      password: '123456789',
    }
  });
  
}

main()