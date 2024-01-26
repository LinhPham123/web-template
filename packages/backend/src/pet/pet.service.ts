import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetEntity } from '../entities/pet/pet.entity';
import { CreatePetDto } from '../dtos/pet/pet.dto';

@Injectable()
export class PetService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(PetEntity)
    public readonly repository: Repository<PetEntity>,
  ) {
    this.logger = new Logger(PetEntity.name);
  }

  async createPet(pet: CreatePetDto) {
    this.logger.log(`Inserting pet.. ${pet}`);
    return this.repository.insert(pet);
  }
}
