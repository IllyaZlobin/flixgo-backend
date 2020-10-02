import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country, Movie, MoviePhotos } from '../../core/typeorm';
import { MoviesController } from './movie.controller';
import { MoviesService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MoviePhotos, Country])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MovieModule {}
