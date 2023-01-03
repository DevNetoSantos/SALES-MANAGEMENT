import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';

const employeeEntityList: CreateEmployeeDto[] = [   //entidade criada lá em DTO
  new CreateEmployeeDto({id: '1', name: 'neto', lastname: 'santos', email: 'neto@gmail.com', password: '12345',}),
  new CreateEmployeeDto({id: '2', name: 'levi', lastname: 'bruno', email: 'levi@gmail.com', password: '54321'}),
]


describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let employeeRepository: PrismaService;

  const mockEmployeerService = {
    findMany: jest.fn().mockResolvedValue(employeeEntityList),
    findAll: jest.fn().mockResolvedValue(employeeEntityList),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService, PrismaService]
    })
    .overrideProvider(EmployeeService)
    .useValue(mockEmployeerService)
    .compile();

    employeeService = module.get<EmployeeService>(EmployeeService);
    employeeRepository = module.get<PrismaService>(PrismaService)
  });

  it('should be defined', () => {
    expect(employeeService).toBeDefined();
    expect(employeeRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a employee list successfuly', async () => {
      //Act
      const result = await employeeService.findAll();

      //Assert
      expect(result).toEqual(employeeEntityList);
      //expect(employeeRepository.findMany).toHaveBeenCalledTimes(1);
    })
  });
});
