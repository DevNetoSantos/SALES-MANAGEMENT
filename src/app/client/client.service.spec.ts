import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma.service';
import { ClientService } from './client.service';

const fakeClient = [
  {
    id: 1,
    name: 'client1',
    cpf: '10000000000'
  },
  {
    id: 2,
    name: 'client2',
    cpf: '20000000000'
  },
  {
    id: 3,
    name: 'client3',
    cpf: '30000000000'
  }
]

const prismMock = {
  client: {
    create: jest.fn().mockReturnValue(fakeClient[0]),
    findMany: jest.fn().mockResolvedValue(fakeClient),
    findUnique: jest.fn().mockResolvedValue(fakeClient[0]),
    update: jest.fn().mockResolvedValue(fakeClient),
    delete: jest.fn().mockReturnValue(undefined) // O método delete não retorna nada
  }
}

describe('ClientService', () => {
  let clientService: ClientService;
  let clientRepository: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService, {provide: PrismaService, useValue: {prismMock}}],
    }).compile();

    clientService = module.get<ClientService>(ClientService);
    clientRepository = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(clientService).toBeDefined();
  });

  it('shoudl be defined', () => {
      expect(clientRepository).toBeDefined();
  });
});
