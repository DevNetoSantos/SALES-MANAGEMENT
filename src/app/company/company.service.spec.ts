import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma.service';
import { CompanyService } from './company.service';

const fakeCompany = [
  {
    id: 1,
    name: 'empresa1',
    cnpj: '10000000000000'
  },
  {
    id: 2,
    name: 'empresa2',
    cnpj: '20000000000000'
  },
  {
    id: 3,
    name: 'empresa3',
    cnpj: '30000000000000'
  }
]

const primsMock = {
  company: {
    create: jest.fn().mockReturnValue(fakeCompany[0]),
    findMany: jest.fn().mockReturnValue(fakeCompany),
    findUniqueOrThrow: jest.fn().mockReturnValue(fakeCompany[0]),
    update: jest.fn().mockReturnValue(fakeCompany[0]),
    delete: jest.fn().mockReturnValue(undefined),
  }
};

describe('CompanyService', () => {
  let companyService: CompanyService;
  let companyRepositoy: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {provide: PrismaService, useValue: primsMock}
      ],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);
    companyRepositoy = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(companyService).toBeDefined();
    expect(companyRepositoy).toBeDefined();
  });

  describe('create', () => {
    it('Should create a new client', async () => {
      //Arrange
      //Act
      const response = await companyService.create(fakeCompany[0]);
      //Assert
      expect(response).toEqual(fakeCompany[0]);
      expect(companyRepositoy.company.create).toHaveBeenCalledTimes(1);
      expect(companyRepositoy.company.create).toHaveBeenCalledWith({
        data: fakeCompany[0]
      });
    });

    it('should throw an error if cnpj is in use', async () => {
      //Arrange
      jest.spyOn(companyRepositoy.company, 'create').mockRejectedValue(new Error());
      //Act
      //Assert
      expect(companyRepositoy.company.create).rejects.toThrowError();
      expect(companyRepositoy.company.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findMany', () => {
    it('Should return an array of company', async () => {
      //Arrange
      //Act
      const response = await companyService.findAll();
      //Assert
      expect(response).toEqual(fakeCompany);
      expect(companyRepositoy.company.findMany).toHaveBeenCalledTimes(1);
    });

    it('Should return an not found if has an ampty array', async () => {
      //Arrange
      jest.spyOn(companyRepositoy.company, 'findMany').mockRejectedValue(new NotFoundException());
      //Act
      //Assert
      expect(companyRepositoy.company.findMany).rejects.toThrowError(new NotFoundException());
      expect(companyRepositoy.company.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUniqueOrThrow', () => {
    it('Should return an unique client', async () => {
      //Arrange
      //Act
      const response = await companyService.findOne(1)
      //Assert
      expect(response).toEqual(fakeCompany[0]);
      expect(companyRepositoy.company.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    });

    it('Should return an error if not found client', async () => {
      //Arrange
      jest.spyOn(companyRepositoy.company, 'findUniqueOrThrow').mockRejectedValue(new NotFoundException());
      //Act
      //Assert
      expect(companyRepositoy.company.findUniqueOrThrow).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('update', () => {
    it('Should update an company', async () => {
      //Arrange
      //Act
      const response = await companyService.update(1, fakeCompany[0]);
      //Assert
      expect(response).toEqual(fakeCompany[0]);
      expect(companyRepositoy.company.update).toHaveBeenCalledTimes(1);
      expect(companyRepositoy.company.update).toHaveBeenCalledWith({
        where: {id: 1},
        data: fakeCompany[0]
      });
    });

    it('should return NotFoundException when no company is found', async () => {
      //Arrange
      const unexistingCompany = {
        id: 99,
        name: 'notfound',
        cnpj: '9999999999999'
      };
      jest.spyOn(companyRepositoy.company, 'update').mockRejectedValue(new Error());
      //Act
      //Assert
      try {
        await companyService.update(99, unexistingCompany);
      } catch (error) {
        expect(error).toEqual(new NotFoundException())
      }
    });
  });

  describe('delete', () => {
    it('Should delete company and return empty body', async () => {
      //Arrange
      //Act
      //Assert
      expect(await companyService.remove(1)).toBeUndefined();
      expect(companyRepositoy.company.delete).toHaveBeenCalledTimes(1);
      expect(companyRepositoy.company.delete).toHaveBeenCalledWith({where: {id: 1}});
    });

    it('Should return NotFoundException if company does not exist', async () => {
      //Arrange
      jest.spyOn(companyRepositoy.company, 'delete').mockRejectedValue(new Error());
      //Act
      //Assert
      try {
        await companyService.remove(99);
      } catch (error) {
        expect(error).toEqual(new NotFoundException());
      }
    });
  });
});
