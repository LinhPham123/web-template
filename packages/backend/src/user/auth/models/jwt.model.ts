import { UserEntity } from '../../../entities/user/user.entity';

export type JwtPayload = Pick<UserEntity, 'id' | 'username' | 'roles'>;

export type JwtBody = Pick<UserEntity, 'username' | 'roles'> & { sub: number };
