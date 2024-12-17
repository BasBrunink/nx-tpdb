import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { DeleteResult, Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { generateMockProfiles } from './profile.controller.spec';
import { CreateProfileDto } from '@nx-tpdb/shared';

describe('ProfileService', () => {
  let service: ProfileService;
  let repo: Repository<Profile>

  const mockRepo = {
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService,
        {provide: getRepositoryToken(Profile), useValue: mockRepo}],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    repo = module.get<Repository<Profile>>(getRepositoryToken(Profile))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call create and save in the repo', async () => {

      const createProfileDto: CreateProfileDto = {
        firstname: 'test',
        lastname: 'name',
        dateOfBirth: new Date(2014, 1, 1),
        email: 'test@example.com',
      };

      const mockResult = generateMockProfiles(1)[0];

      mockRepo.create.mockResolvedValue(mockResult);
      mockRepo.save.mockResolvedValue(mockResult);

      const result = await service.create(createProfileDto);
      expect(result).toEqual(mockResult);
      expect(repo.create).toHaveBeenCalledWith(createProfileDto);
      expect(repo.save).toHaveBeenCalled();
    });
    xit('should unhappy', async () => {

    });
  })
  describe('findall', () => {
    it('should return a array of profiles', async () => {
      const mockResult = generateMockProfiles(4)
      mockRepo.find.mockResolvedValue(mockResult)

      const result = await service.findAll();
      expect(result).toEqual(mockResult);
      expect(repo.find).toHaveBeenCalled();

    });
    xit('should unhappy', async () => {

    });
  })
  describe('findOne', () => {
    it('should find a given profile', async () => {

      const mockResult = generateMockProfiles(1)[0]
      mockRepo.findOne.mockResolvedValue(mockResult)

      const result = await service.findOne('1111');
      expect(result).toEqual(mockResult);
      expect(repo.findOne).toHaveBeenCalled();


    });
    xit('should unhappy', async () => {

    });
  })
  describe('update', () => {
    it('should update the given Profile', async () => {
      const mockResult = generateMockProfiles(1)[0]
      const createProfileDto: CreateProfileDto = {
        firstname: 'test',
        lastname: 'name',
        dateOfBirth: new Date(2014, 1, 1),
        email: 'test@example.com',
      };
      mockRepo.save.mockResolvedValue(mockResult)

      const result = await service.update('1111', createProfileDto);
      expect(result).toEqual(mockResult);
      expect(repo.save).toHaveBeenCalled();

    });
    xit('should unhappy', async () => {

    });
  })
  describe('remove', () => {
    it('should remove the given profile', async () => {
      const mockResult = new DeleteResult()
      mockResult.affected = 1;

      mockRepo.delete.mockResolvedValue(mockResult);
      const result = await service.remove('1');
      expect(repo.delete).toHaveBeenCalled();
      expect(result.affected).toEqual(1);
    });
    xit('should unhappy', async () => {

    });
  })
});
