import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService} from '../user/user.service';
import { UserJWTResponseDTO, UserLoginDto, UserRegistrationDto ,UserJwtResponse } from '@nx-tpdb/shared';
import {JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async register(dto: UserRegistrationDto) {
    const user = await this.userService.create(dto);
    user.password = '';
    return user;
  }

  async login(dto: UserLoginDto): Promise<UserJwtResponse> {
    const userResult = await this.userService.login(dto)

    if(!userResult) {
      throw new UnauthorizedException('Invalid Credentials')
    }
    const user = await this.userService.findOneByUsername(userResult.username);
    const payload: UserJWTResponseDTO = {username: user.username, userId: user.id, role:  user.role}
    const accessToken = this.jwtService.sign(payload)
    return {user: payload, accessToken} as UserJwtResponse

  }




}
