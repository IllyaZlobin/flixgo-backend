import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as AWS from 'aws-sdk';
import { File } from '../../core/models';
import { AwsHelper, UserFriendlyException } from 'src/core/nest';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;

  constructor(private _configService: ConfigService) {
    const credentials = _configService.s3Config;

    this.s3 = new AWS.S3({ credentials });
  }

  async uploadImage(file: File): Promise<string> {
    try {
      const fileName = AwsHelper.fileName();

      const result = await this.s3
        .upload({
          Bucket: this._configService.get('AWS_BUCKET_NAME'),
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        })
        .promise();

      return result.Location;
    } catch (err) {
      throw new UserFriendlyException(err.message);
    }
  }
}
