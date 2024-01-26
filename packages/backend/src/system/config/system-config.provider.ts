import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Credentials } from 'aws-sdk';
import { config } from 'aws-sdk/global';

@Injectable()
export class SystemConfigProvider {
  constructor(protected readonly envConfigSrv: ConfigService) {}

  public get isProduction() {
    return this.envConfigSrv.get('NODE_ENV', 'development') === 'production';
  }

  public get mariadb() {
    return this.envConfigSrv.get<string>('MARIADB_URL');
  }

  public get jwt() {
    return {
      secret: this.envConfigSrv.get<string>('JWT_SECRET'),
      expiresIn: this.envConfigSrv.get<string>('JWT_EXPIRE_TIME'),
    };
  }

  public get awsCredentials(): Promise<Credentials> {
    return new Promise((resolve, reject) => {
      config.getCredentials((err, credentials) => {
        if (err) {
          reject(err);
        } else if (typeof (credentials as Credentials).get === 'function') {
          resolve(credentials as Credentials);
        } else {
          resolve(new Credentials(credentials));
        }
      });
    });
  }
}
