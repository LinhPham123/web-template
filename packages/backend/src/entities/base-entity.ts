import { CreateDateColumn, UpdateDateColumn, ViewColumn } from 'typeorm';

export abstract class BaseEntity {
  @ViewColumn()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @ViewColumn()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
