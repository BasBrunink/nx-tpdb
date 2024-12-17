import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from '@nx-tpdb/shared';
import { Profile } from './entities/profile.entity';
import mock = jest.mock;
import { DeleteResult } from 'typeorm';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: jest.Mocked<ProfileService>;

  const mockProfileService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [{ provide: ProfileService, useValue: mockProfileService }],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get(ProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call profileService.create with the corrent params and return the created user', async () => {
      const createProfileDto: CreateProfileDto = {
        firstname: 'test',
        lastname: 'name',
        dateOfBirth: new Date(2014, 1, 1),
        email: 'test@example.com',
      };
      const mockProfile = new Profile();
      mockProfile.email = 'test@example.com';
      mockProfile.firstname = ' test';
      mockProfile.lastname = 'name';
      mockProfile.dateOfBirth = new Date(2014, 1, 1);
      mockProfileService.create.mockResolvedValue(mockProfile);

      const result = await controller.create(createProfileDto);

      expect(service.create).toHaveBeenCalledWith(createProfileDto);
      expect(result).toEqual(mockProfile);
    });
    xit('should return an error when the service return an error', () => {

    })
  });
  describe('findAll', () => {
    it('should return an array of all profiles', async  () => {

      const mockresult: Profile[] = generateMockProfiles(4);
      mockProfileService.findAll.mockResolvedValue(mockresult);
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockresult);


    })
    xit('should return an error when the service return an error', () => {

    })
  })
  describe('findOne', () => {
    it('should return a single profile', async () => {

      const mockResult: Profile = generateMockProfiles(1)[0];
      mockProfileService.findOne.mockResolvedValue(mockResult);
      const result = await controller.findOne('1111');
      expect(service.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    })
    xit('should return an error when the service return an error', () => {

    })
  })
  describe('update', () => {
    it('should update the Profile with the new one', async () => {
      const mockResult: Profile = generateMockProfiles(1)[0];
      mockProfileService.update.mockResolvedValue(mockResult);
      mockResult.id = '1';
      const result = await controller.update('1', mockResult);
      expect(service.update).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    })
    xit('should return an error when the service return an error', () => {

    })
  })
  describe('delete', () => {
    it('should delete a given profile', async () => {
      const mockResult = new DeleteResult()
      mockResult.affected = 1;

      mockProfileService.remove.mockResolvedValue(mockResult);
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalled();
      expect(result.affected).toEqual(1);
    })
    xit('should return an error when the service return an error', () => {

    })
  })
});

function generateMockProfiles(amnt: number): Profile[] {
  const result : Profile[] = []
  for (let i = 0; i < amnt; i++) {
    const inter: Profile = new Profile()
    inter.firstname = 'test' + i;
    inter.lastname = 'user' + i;
    inter.dateOfBirth = new Date(2024, i,i );
    inter.email = `test${i}@example.com`
    result.push(inter)
  }
  return result
}
