import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role, UserRegistrationDto } from '@nx-tpdb/shared';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    findOneByUsername: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    addProfileToUser: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an user when called', async () => {
      const createUserDto: UserRegistrationDto = {
        username: 'test',
        password: 'test',
        role: Role.User,
      };

      const mockUser = new User();
      mockUser.username = 'test';
      mockUser.password = 'test';
      mockUser.role = Role.User;
      mockService.create.mockResolvedValue(mockUser);
      const result = await controller.create(createUserDto);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    xit('UNHAPPY should', async () => {});
  });
  describe('findAll', () => {
    it('should find all users given by the mock', async () => {

      const mockResult : User[] = generateMockUsers(4);
      mockService.findAll.mockResolvedValue(mockResult);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResult);

    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    xit('UNHAPPY should', async () => {});
  });
  describe('findOneById', () => {
    it('should findOne user with given Id', async () => {
      const mockResult: User = generateMockUsers(1)[0]
      mockService.findOneById.mockResolvedValue(mockResult);

      controller.findOne('1111').then(() => {
        expect(service.findOneById).toHaveBeenCalled();
      })

      // expect(result).toEqual(mockResult);
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    xit('UNHAPPY should', async () => {});
  });
  describe('update', () => {
    it('should', async () => {
      const mockResult: User = generateMockUsers(1)[0];

      mockService.update.mockResolvedValue(mockResult);
      mockResult.id = '1'

      const result = await controller.update('1', mockResult);
      expect(service.update).toHaveBeenCalled();
      expect(result).toEqual(mockResult);

    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    xit('UNHAPPY should', async () => {});
  });
  describe('remove', () => {
    it('should remove given user', async () => {
      const mockResult = new DeleteResult()
      mockResult.affected = 1;
      mockService.remove.mockResolvedValue(mockResult);
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalled();
      expect(result.affected).toEqual(1);
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    xit('UNHAPPY should', async () => {});
  });
  describe('addProfile', () => {
    it('should remove given user', async () => {
      const mockResult = new Profile()
      mockResult.email = 'test@test.com'
      mockResult.lastname = 'user';
      mockResult.firstname = 'test';
      mockResult.dateOfBirth = new Date(2024,1,1)

      mockService.addProfileToUser.mockResolvedValue(mockResult);
      mockResult.id = '1'

      const result = await controller.addProfile('1', mockResult);
      expect(service.addProfileToUser).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    xit('UNHAPPY should', async () => {});
  });
});

export function generateMockUsers(amnt: number): User[] {
  const result: User[] = [];
  for (let i = 0; i <amnt; i++) {
    const inter: User = new User();
    inter.role = Role.User;
    inter.username = 'test' + i;
    inter.password = 'password' + i;
    result.push(inter);
  }
  return result;
}
