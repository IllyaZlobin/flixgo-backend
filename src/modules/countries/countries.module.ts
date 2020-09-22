import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/core/typeorm/entities/country.entity';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [CountriesService],
  controllers: [CountriesController],
})
export class CountryModule {}
