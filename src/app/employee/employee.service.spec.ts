import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  const mockEmployeerController = {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService]
    })
    .overrideProvider(EmployeeService)
    .useValue(mockEmployeerController)
    .compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

/*   describe('findAll', () => {
    it('should return a employee list entiry successfuly', async () => {
      
    })
  }); */
});
