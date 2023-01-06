import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma.service';
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

const updateFakeEmployee = {
  id: 1,
  name: 'teste25',
  lastname: 'testado25',
  email: 'teste25@gmail.com',
  password: '12345',
};

const prismaMock = {
  employee: {
    create: jest.fn().mockReturnValue(fakeEmployee[0]),
    findMany: jest.fn().mockResolvedValue(fakeEmployee),
    findUnique: jest.fn().mockResolvedValue(fakeEmployee[0]),
    update: jest.fn().mockResolvedValue(updateFakeEmployee),
    delete: jest.fn().mockReturnValue(undefined) // O método delete não retorna nada
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

    it('should return error if it has no data', () => {
      //Arange
      jest.spyOn(employeeRepository.employee, 'findMany').mockRejectedValue(new Error());

      //Asert
      expect(employeeService.findAll()).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('findUnique', () => {
    it('should return a single post', async () => {
      //Arrange
      //Act
      const response = await employeeService.findOne(1);
      //Assert
      expect(response).toEqual(fakeEmployee[0]);
      expect(await employeeRepository.employee.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should return empty if not found employee', async () => {
      //Arrange
      jest.spyOn(employeeRepository.employee, 'findUnique').mockReturnValue(undefined);
      //Act
      const response = await employeeService.findOne(99);
      //Assert
      expect(response).toBe(undefined);
    });
  });

  describe('create', () => {
    it('should create a new employee', async () => {
      //Arange0t
      //Act
      const response = await employeeService.create(fakeEmployee[0])
      //Assert
      expect(employeeRepository.employee.create).toHaveBeenCalledTimes(1);
      expect(response).toEqual(fakeEmployee[0]);
      expect(response).toBe(fakeEmployee[0]);
    });

    it('should throw an error', () => {
      //Arrange
      jest.spyOn(employeeRepository.employee, 'create').mockRejectedValue(new Error());
      //Assert
      expect(employeeService.create(fakeEmployee[5])).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a employee', async () =>{
      //Arrange
      const data = {
        id: 1,
        name: 'teste25',
        lastname: 'testado25',
        email: 'teste25@gmail.com',
        password: '12345',
      }
      //Act
      const response = await employeeService.update(0, data);
      //Assert
      expect(response).toEqual(updateFakeEmployee);
      expect(employeeRepository.employee.update).toHaveBeenCalledTimes(1);
    });

    it('sould throw an error', () =>{
      //Arrange
      jest.spyOn(employeeRepository.employee, 'update').mockRejectedValueOnce(new Error());
      //Act
      //Assert
      expect(employeeService.update).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should delete a employee and return empty', async () => {
      //Arrange
      //Act
      const response = await employeeService.remove(0);
      //Assert
      expect(response).toEqual(undefined);
      expect(await employeeService.remove(0)).toBeUndefined();
      expect(await employeeRepository.employee.delete).toHaveBeenCalledTimes(2);
    });

    it('should return NotFoundException if employee does not exist', async () => {
      //Arrange
      jest.spyOn(employeeRepository.employee, 'delete').mockRejectedValue(new Error());
      //Act
      //Assert
      try {
        await employeeService.remove(0);
      } catch (error) {
        expect(error).toEqual(new Error());
      }
    });
  });
});
