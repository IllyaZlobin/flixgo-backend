import { uuid } from 'uuidv4';
import { CredentialsOptions } from 'aws-sdk/lib/credentials';
import * as AWS from 'aws-sdk';

export class AwsHelper {
  static resolveCredentials(): Promise<AWS.Credentials | CredentialsOptions> {
    return new Promise((resolve, reject) => {
      AWS.config.getCredentials(error =>
        error ? reject(error) : resolve(AWS.config.credentials),
      );
    });
  }

  static get Uuid(): string {
    return uuid();
  }

  static fileFormat(text: string): string {
    const format = text.split('.').pop();
    return format;
  }

  static fileName(): string {
    return uuid();
  }
}
