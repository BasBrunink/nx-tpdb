import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@nx-tpdb/shared';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockService }],
    }).compile();

    controller = module.get(AuthController);
    service = module.get(AuthService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('register',  () => {
    it('should call register in the authService',async () => {
      const res = await controller.register({ username: 'test', password: '', role: Role.Admin });
      expect(service.register).toHaveBeenCalled();
    })

  });

  describe('login', () => {
    it('should call login in the authservice',async () => {
      const res = await controller.login({username: '', password: ''})
      expect(service.login).toHaveBeenCalled();
    });
  })
});
