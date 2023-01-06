import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma.service';
import { CreateCompanyDto } from '../company/dto/create-company.dto';
import { EmployeeService } from './employee.service';

const fakeEmployee = [
  {
    id: 1,
    name: 'teste1',
    lastname: 'testado1',
    email: 'teste1@gmail.com',
    password: '12345',
  },
  {
    id: 2,
    name: 'teste2',
    lastname: 'testado2',
    email: 'teste2@gmail.com',
    password: '12345',
  },
  {
    id: 3,
    name: 'teste3',
    lastname: 'testado3',
    email: 'teste3@gmail.com',
    password: '12345',
  },
];

const prismaMock = {
  employee: {
    create: jest.fn().mockReturnValue(fakeEmployee[0]),
    findMany: jest.fn().mockResolvedValue(fakeEmployee),
    findUnique: jest.fn().mockResolvedValue(fakeEmployee[0]),
    update: jest.fn().mockResolvedValue(fakeEmployee[0]),
    delete: jest.fn(), // O método delete não retorna nada
  },
};

describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let employeeRepository: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        { provide: PrismaService, useValue: prismaMock }
      ],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService);
    employeeRepository = module.get<PrismaService>(PrismaService)
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(employeeService).toBeDefined();
    expect(employeeRepository).toBeDefined();
  });

  describe('findAll', () => {
    it(`should return an array of employee`, async () => {
      //Act
      const response = await employeeService.findAll();

      //Assert
      expect(response).toEqual(fakeEmployee);
      expect(employeeRepository.employee.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new employee', async () => {
      //Arange

      //Act
      const response = await employeeService.create(fakeEmployee[0])
      //Assert
      expect(employeeRepository.employee.create).toHaveBeenCalledTimes(1);
      expect(response).toBe(fakeEmployee[0]);
    });
  });

});
