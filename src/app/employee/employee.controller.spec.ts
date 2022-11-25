import { Test, TestingModule } from '@nestjs/testing';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

const employeeEntityList: CreateEmployeeDto[] = [
  new CreateEmployeeDto({ id: '1', name: 'neto', lastname: 'santos', email: 'neto@gmail.com', password: '12345' })
]

describe('EmployeeController', () => {
  let employeeController: EmployeeController;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn().mockResolvedValue(employeeEntityList),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          }
        }
      ],
    }).compile();

    employeeController = module.get<EmployeeController>(EmployeeController);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(employeeController).toBeDefined();
    expect(employeeService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a employee list entity successfully', async () => {
      //arange - preprar variavel
      const result = await employeeController.findAll();
      //act - rodar o teste
      //assert - dizer a forma que teste deve definidos
      expect(result).toEqual(employeeEntityList);
    });
  });
});
