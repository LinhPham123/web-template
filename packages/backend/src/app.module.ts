import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import UserModule from './user';
import CharacterModule from './pet';
import MariadbModule from './system/database';
import SystemConfigModule from './system/config';

@Module({
  imports: [SystemConfigModule, MariadbModule, UserModule, CharacterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
