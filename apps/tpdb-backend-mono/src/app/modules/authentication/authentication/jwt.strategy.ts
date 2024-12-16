import { PassportStrategy } from '@nestjs/passport';
import {ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { UserJwtResponse } from '@nx-tpdb/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET')
    });
  }
  async validate(payload: UserJwtResponse) {
    return this.authService.validateUserByUsername(payload.user.username)
  }
}
