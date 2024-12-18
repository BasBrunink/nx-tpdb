import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto, UserRegistrationDto } from '@nx-tpdb/shared';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() dto: UserRegistrationDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto:UserLoginDto) {
    return this.authService.login(dto)

  }

}