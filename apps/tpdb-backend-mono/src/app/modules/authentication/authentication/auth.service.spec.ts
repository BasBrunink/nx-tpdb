import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Role, UserResponseDto } from '@nx-tpdb/shared';
import { User } from '../user/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let jwtService: JwtService;

  const mockUserService = {
    create: jest.fn(),
    findOneByUsername: jest.fn(),
    login: jest.fn()
  };

  const mockJwtService = {
    sign: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService }
      ]
    }).compile();

    service = module.get(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('validateUserByUsername', () => {
    it('should call findOneByUSername in the user service', async () => {
      service.validateUserByUsername('').then(() => {
        expect(userService.findOneByUsername).toHaveBeenCalled();
      });

    });
  });
  describe('register', () => {
    it('should call create in the userservice and return user with empty password', async () => {
      const mockUser = new User();
      mockUser.username = 'test';
      mockUser.password = 'test';
      mockUser.role = Role.User;

      mockUserService.create.mockResolvedValue(mockUser);
      service.register({
        username: 'test',
        password: 'test',
        role: Role.User
      }).then((res) => {
        expect(userService.create).toHaveBeenCalled();
        expect(res.password).toEqual('');
      });


    });
  });
  describe('login', () => {
    it('should return a JWT token', () => {
      const mockUserResponse: UserResponseDto = new UserResponseDto('', Role.User);
      mockUserService.login.mockResolvedValue(mockUserResponse);
      const mockUser: User = {
        username: 'test',
        password: 'password',
        role: Role.User
      };
      mockUserService.findOneByUsername.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('123')
      service.login({ username: '', password: '' }).then((res) => {
        expect(res.accessToken).toBe('123')
        expect(res.user.username).toEqual('test');
      });
    });
  });
});
