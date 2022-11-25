import { Test, TestingModule } from '@nestjs/testing';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

const employeeEntityList: CreateEmployeeDto[] = [
  new CreateEmployeeDto({ id: '1', name: 'neto', lastname: 'santos', email: 'neto@gmail.com', password: '12345' })
]

const newEmployeeEntity = new CreateEmployeeDto({
  id: '2',
  name: 'new user',
  lastname: 'new lastname',
  email: 'new email',
  password: 'new password'
})

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
            create: jest.fn().mockResolvedValue(newEmployeeEntity),
            findAll: jest.fn().mockResolvedValue(employeeEntityList),
            findOne: jest.fn().mockResolvedValue(employeeEntityList[0]),
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
      expect(typeof result).toBe('object');
      expect(employeeService.findAll).toHaveBeenCalledTimes(1); //chamado menos uma vez
    });

    it('should throw an exception', () => {
      jest.spyOn(employeeService, 'findAll').mockRejectedValueOnce(new Error());

      expect(employeeController.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create new employeeitem successfully', async () => {
      const body: CreateEmployeeDto = {
        id: '2',
        name: 'new user',
        lastname: 'new lastname',
        email: 'new email',
        password: 'new password'
      }

      const result = await employeeController.create(body);

      expect(result).toEqual(newEmployeeEntity);
      expect(employeeService.create).toHaveBeenCalledTimes(1);
      expect(employeeService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      const body: CreateEmployeeDto = {
        id: '2',
        name: 'new user',
        lastname: 'new lastname',
        email: 'new email',
        password: 'new password'
      };

      jest.spyOn(employeeService, 'create').mockRejectedValueOnce(new Error());

      expect(employeeController.create(body)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should get a employee item successfully', async () => {
      const result = await employeeController.findOne(1);

      expect(result).toEqual(employeeEntityList[0]);
      expect(employeeService.findOne).toHaveBeenCalledWith(1); //passado parametro
      expect(employeeService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(employeeService, 'findOne').mockRejectedValueOnce(new Error());

      expect(employeeController.findOne(1)).rejects.toThrowError();
    });
  });
  
});
