import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { File } from '../../core/models';
import { UserFriendlyException } from 'src/core/nest';
import { Country, Movie, MoviePhotos } from 'src/core/typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { S3Service } from '../../shared/services/s3.service';
import { MovieCreateRequest } from './dto/create/movieCreate.request';
import { MovieCreateResponse } from './dto/create/movieCreate.response';

@Injectable()
export class MoviesService {
  constructor(
    private readonly _s3Service: S3Service,
    @InjectRepository(Movie)
    @InjectRepository(Country)
    private readonly _countryRepository: Repository<Country>,
    @InjectConnection()
    private readonly _connection: Connection,
  ) {}

  /**
   * @description create new movie
   * @param model 
   */
  async createMovie(model: MovieCreateRequest): Promise<MovieCreateResponse> {
    const {
      title,
      description,
      release,
      runtime,
      age,
      genre,
      country,
      quality,
      status,
      photos,
    } = model;

    const queryRunner = this._connection.createQueryRunner();

    await queryRunner.startTransaction();

    const [poster, ...imgUrls] = await this.loadImages(...photos);
    const selectedCountry = await this.getCountryByName(country);

    try {
      const movieForSaving = await queryRunner.manager.create('movie', {
        title,
        description,
        release,
        runtime,
        age,
        genre,
        quality,
        status,
        poster,
        country: selectedCountry,
      });
      const movie = (await queryRunner.manager.save(movieForSaving)) as Movie;

      const moviePhotos = await this.saveMoviePhotos(
        queryRunner,
        movie,
        imgUrls,
      );

      await queryRunner.commitTransaction();

      const result = new MovieCreateResponse(
        movie.id,
        movie.title,
        movie.description,
        movie.release,
        movie.runtime,
        movie.genre,
        movie.quality,
        selectedCountry,
        movie.poster,
        moviePhotos,
      );

      return result;
    } catch (err) {
      await this._s3Service.deleteImages([poster, ...imgUrls]);
      await queryRunner.rollbackTransaction();
      throw new UserFriendlyException('Problem with save movie');
    } finally {
      await queryRunner.release();
    }
  }

  private async getCountryByName(name: string): Promise<Country> {
    const country = await this._countryRepository.findOne({ where: { name } });

    return country;
  }

  /**
   * @description load image to aws s3
   * @param files
   */
  private async loadImages(...files: File[]) {
    const urls: string[] = [];

    for (const file of files) {
      const image = await this._s3Service.uploadImage(file);
      urls.push(image.Location);
    }

    return urls;
  }

  /**
   * @description save photo from bucket to database
   * @param queryRunner
   * @param movie
   * @param urls
   */
  private async saveMoviePhotos(
    queryRunner: QueryRunner,
    movie,
    urls: string[],
  ): Promise<MoviePhotos[]> {
    const photos: MoviePhotos[] = [];

    for (const url of urls) {
      const photoForSaving = await queryRunner.manager.create('movie_photos', {
        photo: url,
        movie,
      });
      const {
        id,
        photo,
        createdAt,
        updatedAt,
      } = (await queryRunner.manager.save(photoForSaving)) as MoviePhotos;
      photos.push({ id, photo, createdAt, updatedAt });
    }

    return photos;
  }
}
