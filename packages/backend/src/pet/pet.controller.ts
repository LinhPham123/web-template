import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { PetService } from './pet.service';
import { UserRole } from '../entities/user/user.entity';
import { JwtAuthGuard } from '../user/auth/guards/jwt.guard';
import { RolesGuard } from '../user/auth/guards/roles.guard';
import { Roles } from '../user/auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Roles(UserRole.USER)
  @Post('add')
  addPet(@Body() body) {
    return this.petService.createPet(body);
  }
}
