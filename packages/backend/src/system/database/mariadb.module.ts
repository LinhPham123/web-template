import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from '../../entities/pet/pet.entity';
import { UserEntity } from '../../entities/user/user.entity';
import { SystemConfigProvider } from '../config/system-config.provider';
import { SystemConfigModule } from '../config/system-config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SystemConfigModule],
      useFactory: (systemConfigProvider: SystemConfigProvider) => ({
        type: 'mariadb',
        entities: [UserEntity, PetEntity],
        charset: 'utf8mb4',
        timezone: '+00:00',
        url: systemConfigProvider.mariadb,
      }),
      inject: [SystemConfigProvider],
    }),
  ],
})
export class MariadbModule {}
