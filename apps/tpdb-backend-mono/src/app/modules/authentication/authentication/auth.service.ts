import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService} from '../user/user.service';
import { UserJWTResponseDTO, UserLoginDto, UserRegistrationDto ,UserJwtResponse } from '@nx-tpdb/shared';
import {JwtService } from '@nestjs/jwt'
import { User } from '../user/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUserByUsername(username: string): Promise<User> {
    return this.userService.findOneByUsername(username);
  }

  async register(dto: UserRegistrationDto) {
    const user = await this.userService.create(dto);
    user.password = '';
    return user;
  }

  async login(dto: UserLoginDto): Promise<UserJwtResponse> {
    const userResult = await this.userService.login(dto);

    if (!userResult) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const user = await this.userService.findOneByUsername(userResult.username);
    const payload: UserJWTResponseDTO = {
      username: user.username,
      userId: user.id,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);
    return { user: payload, accessToken } as UserJwtResponse;
  }
}
