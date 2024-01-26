import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email address!' })
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class UpdateUserBasicInfoDto {
  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional()
  bio?: string;
}

export class UpdateUserPasswordDto extends PickType(CreateUserDto, [
  'password',
]) {}
