import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { JwtBody } from '../models/jwt.model';
import { SystemConfigProvider } from '../../../system/config/system-config.provider';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configProvider: SystemConfigProvider) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configProvider.jwt.secret,
    });
  }

  async validate(payload: JwtBody) {
    return {
      id: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
