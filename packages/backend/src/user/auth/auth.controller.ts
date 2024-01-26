import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserService } from '../user.service';
import { CreateUserDto } from '../../dtos/user/user.dto';
import { JwtBody } from './models/jwt.model';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return this.userService.registerUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/resend-verification-link')
  async resendVerificationLink(@Request() jwt: JwtBody) {
    return this.authService.resendVerificationLink(jwt.username);
  }

  @Get('/account-verification')
  async verifyAccount(@Query('token') token?: string) {
    return this.authService.checkVerificationToken(token);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  logout() {
    return 'OK';
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getProfile(@Request() req) {
    return req.user;
  }
}
