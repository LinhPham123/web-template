import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base-entity';

@Entity({ name: 'pet' })
export class PetEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  species?: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  age?: number;
}
