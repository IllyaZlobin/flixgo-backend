import { ICountry } from '../models/country.model';
import { AbstractEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity('country')
export class Country extends AbstractEntity implements ICountry {
  @Column('varchar')  
  name: string;

  @Column('varchar')
  region: string;
}
