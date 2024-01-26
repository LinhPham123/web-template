import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from '../entities/pet/pet.entity';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],
  providers: [PetService],
  controllers: [PetController],
  exports: [PetService],
})
export class PetModule {}
