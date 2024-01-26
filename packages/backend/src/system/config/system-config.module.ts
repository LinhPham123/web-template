import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SystemConfigProvider } from './system-config.provider';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [SystemConfigProvider],
  exports: [SystemConfigProvider],
})
export class SystemConfigModule {}
