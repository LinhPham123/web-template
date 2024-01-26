import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base-entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'PLAYER',
}

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  @ApiProperty()
  encryptedPassword: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true, default: null })
  avatarUrl?: string;

  @Column({ type: 'longtext', nullable: true, default: null })
  bio?: string;

  @Column({ type: 'simple-array' })
  roles: UserRole[];
}
