import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  species?: string;

  @ApiPropertyOptional()
  age?: number;
}
