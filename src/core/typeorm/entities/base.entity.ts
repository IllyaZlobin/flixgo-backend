import { IBaseModel } from '../models/base.model';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity implements IBaseModel {
  @PrimaryGeneratedColumn()
  id: number;
}
