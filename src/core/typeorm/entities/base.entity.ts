import { IBaseModel } from '../models/base.model';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity implements IBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'createdAt', type: 'datetime' })
  createdAt;

  @UpdateDateColumn({ name: 'updatedAt', type: 'datetime' })
  updatedAt;
}
