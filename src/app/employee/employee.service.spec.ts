import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'rxjs';
import { PrismaService } from '../../database/prisma.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';

const fakeEmployee = [
  {
    id: 1,
    name: 'teste1',
    lastname: 'testado1',
    email: 'teste1@gmail.com',
    password: undefined,
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
    create: jest.fn().mockReturnValue(fakeEmployee[2]),
    findMany: jest.fn().mockResolvedValue(fakeEmployee),
    findUnique: jest.fn().mockResolvedValue(fakeEmployee[0]),
    update: jest.fn().mockResolvedValue(fakeEmployee[1]),
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

    it('should throw an exception', () => {
      //Arange
      jest.spyOn(employeeRepository.employee, 'findMany').mockRejectedValue(new Error());

      //Asert
      expect(employeeService.findAll()).rejects.toThrowError();

    });
  });

  describe('findOne', () => {
    it('should return a single emplyee', async () => {
      //Act
      const repsonse = await employeeService.findOne(1);

      //Assert
      expect(repsonse).toEqual(fakeEmployee[0]);
      expect(employeeRepository.employee.findUnique).toHaveBeenCalledTimes(1);
      expect(employeeRepository.employee.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw a not found exception', () => {
      //Act

      //Arange
      jest.spyOn(employeeRepository.employee, 'findUnique').mockRejectedValueOnce(new Error());

      //Assert
      expect(employeeService.findOne(1)).rejects.toThrowError(new Error())
    });
  });

  describe('create', () => {
    it('should create a new employee', async () => {
      //Arange

      //Act
      const response = await employeeService.create(fakeEmployee[2]);

      //Assert
      expect(response).toBe(fakeEmployee[2]);
      expect(employeeRepository.employee.create).toHaveBeenCalledTimes(1);
    });
  });

    describe('update', () => {
      it(`should update a employee`, async () => {
        //Act
        const response = await employeeService.update(2, fakeEmployee[1]);
        
        //Assert
        expect(response).toEqual(fakeEmployee[1]);
        expect(employeeRepository.employee.update).toHaveBeenCalledTimes(1);
      });

      it('should throw a not found exception', async () => {
        //Arange
        const data: UpdateEmployeeDto = {
          id: 42,
          name: 'teste88',
          lastname: 'testado88',
          email: 'teste88@gmail.com',
          password: '12345',
        }
        
        jest.spyOn(employeeRepository.employee, 'update').mockRejectedValue(new Error());
        
        //Assert
        expect(employeeService.update(42, data)).rejects.toThrowError(NotFoundException);
      });
    });

});
