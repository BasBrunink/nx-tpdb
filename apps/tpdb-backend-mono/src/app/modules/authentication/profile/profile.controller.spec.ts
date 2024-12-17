import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from '@nx-tpdb/shared';
import { Profile } from './entities/profile.entity';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: jest.Mocked<ProfileService>;

  const mockProfileService = {
    create: jest.fn(),
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

      const result = await controller.create(createProfileDto)


      expect(service.create).toHaveBeenCalledWith(createProfileDto);
      expect(result).toEqual(mockProfile)
    });
  });
});
