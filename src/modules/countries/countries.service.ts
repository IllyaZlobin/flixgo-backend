import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../../core/typeorm/entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
  ) {}

  async getAll() {
    const [countries, totalCount] = await this.countryRepo.findAndCount();

    return { countries, totalCount };
  }
}
