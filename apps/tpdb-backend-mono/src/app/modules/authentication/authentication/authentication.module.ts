import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ProfileModule } from '../profile/profile.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    UserModule,
    ProfileModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_TIME')
      }
    })
  })],
  providers:[AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthenticationModule {}
