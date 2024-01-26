import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './models/jwt.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async resendVerificationLink(username: string): Promise<any> {
    return this.userService
      .findUser({ select: ['email'], where: { username } })
      .then((user) => {
        if (!user) {
          throw new BadRequestException('User does not exist');
        }
        // Send activation link to email
        return;
      });
  }

  async checkVerificationToken(_token: string) {
    // Get and verify
    await this.userService.updateUser({ email: 'test' }, { isVerified: true });
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.userService.findUser({ where: { username } });
    if (user) {
      return bcrypt
        .compare(user.encryptedPassword, password)
        .then((match) => match);
    }
    return false;
  }

  async login(payload: JwtPayload) {
    return this.userService
      .findUser({ where: { username: payload.username } })
      .then((user) => {
        return {
          access_token: this.jwtService.sign({
            username: user.username,
            sub: user.id,
            roles: user.roles,
          }),
        };
      });
  }
}
