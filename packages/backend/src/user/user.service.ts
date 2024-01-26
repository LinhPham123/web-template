import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateUserDto } from '../dtos/user/user.dto';
import * as bcrypt from 'bcrypt';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UserEntity, UserRole } from '../entities/user/user.entity';

@Injectable()
export class UserService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(UserEntity)
    public readonly repository: Repository<UserEntity>,
  ) {
    this.logger = new Logger(UserService.name);
  }

  private async checkEmailExists(email: string) {
    return this.repository.findOne({ where: { email } }).then((email) => {
      if (email) {
        throw new BadRequestException('Email is already in use');
      }
      return;
    });
  }

  private async checkUsernameExists(username: string) {
    return this.repository.findOne({ where: { username } }).then((username) => {
      if (username) {
        throw new BadRequestException('Username is already in use');
      }
      return;
    });
  }

  public async registerUser(dto: CreateUserDto) {
    return Promise.allSettled([
      this.checkUsernameExists(dto.username),
      this.checkEmailExists(dto.email),
    ])
      .then(() => bcrypt.hash(dto.password, 10))
      .then(async (hash) => {
        await this.repository.insert({
          username: dto.username,
          email: dto.email,
          encryptedPassword: hash,
          roles: [UserRole.USER],
        });
        // Send activation link to email
        return dto.username;
      });
  }

  public async updateUser(
    where: FindOptionsWhere<UserEntity>,
    value: QueryDeepPartialEntity<UserEntity>,
  ): Promise<UpdateResult> {
    return this.repository.update(where, value);
  }

  public async findUser(
    options: FindOneOptions<UserEntity>,
  ): Promise<UserEntity | undefined> {
    return this.repository.findOne(options);
  }
}
