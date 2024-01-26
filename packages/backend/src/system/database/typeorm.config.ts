import { DataSource } from 'typeorm';
import { PetEntity } from '../../entities/pet/pet.entity';
import { UserEntity } from '../../entities/user/user.entity';
import * as process from 'process';
import 'dotenv/config';

export default new DataSource({
  type: 'mariadb',
  url: process.env.MARIADB_URL,
  entities: [UserEntity, PetEntity],
  migrations: [__dirname + '/migrations/*.ts'],
});
