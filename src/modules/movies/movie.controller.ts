import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { File } from '../../core/models';
import { ApiMultiFile, imageFileFilter } from '../../core/nest';
import { MovieCreateRequest } from './dto/create/movieCreate.request';
import { MovieCreateResponse } from './dto/create/movieCreate.response';
import { MoviesService } from './movie.service';

@Controller('movies')
@ApiTags('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  //TODO add role guard here!
  @Post('/')
  @ApiMultiFile()
  @ApiResponse({
    type: MovieCreateResponse,
    description: 'Return movie object'
  })
  @UseInterceptors(
    FilesInterceptor('files', 15, { fileFilter: imageFileFilter }),
  )
  async create(
    @UploadedFiles() files: File[],
    @Body() body: MovieCreateRequest,
  ): Promise<MovieCreateResponse> {
    const response = await this.movieService.createMovie({
      photos: files,
      ...body,
    });
    return response;
  }
}
