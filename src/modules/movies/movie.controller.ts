import { MovieGetAllResponse } from './dto/getAll/movieGetAll.response';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { File } from '../../core/models';
import { ApiMultiFile, imageFileFilter } from '../../core/nest';
import { MovieCreateRequest } from './dto/create/movieCreate.request';
import { MovieCreateResponse } from './dto/create/movieCreate.response';
import { MovieDeleteResponse } from './dto/delete/movieDelete.response';
import { MovieGetAllRequest } from './dto/getAll/movieGetAll.request';
import { MoviesService } from './movie.service';
import { MovieFindResponse } from './dto/find/movieFind.response';

@Controller('movies')
@ApiTags('movies')
export class MoviesController {
  constructor(private _movieService: MoviesService) {}

  //TODO add role guard here!
  @Post('/')
  @ApiMultiFile()
  @ApiResponse({
    type: MovieCreateResponse,
    description: 'Return movie object',
  })
  @UseInterceptors(
    FilesInterceptor('files', 15, { fileFilter: imageFileFilter }),
  )
  async create(
    @UploadedFiles() files: File[],
    @Body() body: MovieCreateRequest,
  ): Promise<MovieCreateResponse> {
    const response = await this._movieService.createMovie({
      photos: files,
      ...body,
    });
    return response;
  }

  @Delete(':id')
  @ApiResponse({
    type: MovieDeleteResponse,
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this._movieService.deleteMovie(id);

    const response = new MovieDeleteResponse('Movie was deleted');

    return response;
  }

  @Get(':name')
  @ApiResponse({
    type: MovieFindResponse,
    status: 200,
  })
  async search(@Query('name') name: string) {
    const movies = await this._movieService.find(name);

    const response = new MovieFindResponse(movies);

    return response;
  }

  @Get('/')
  @ApiResponse({
    type: MovieGetAllResponse,
    status: 200,
  })
  async getAll(@Query() model: MovieGetAllRequest) {
    const { items, totalCount } = await this._movieService.getAll(model);

    const response = new MovieGetAllResponse(items, totalCount);

    return response;
  }
}
