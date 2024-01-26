import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { UserEntity } from '../entities/user/user.entity';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { SystemConfigProvider } from '../system/config/system-config.provider';
import { SystemConfigModule } from '../system/config/system-config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [SystemConfigModule],
      useFactory: (systemConfigProvider: SystemConfigProvider) => ({
        secret: systemConfigProvider.jwt.secret,
        signOptions: { expiresIn: systemConfigProvider.jwt.expiresIn },
      }),
      inject: [SystemConfigProvider],
    }),
  ],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [UserService, AuthService],
})
export class UserModule {}
