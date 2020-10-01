import { File, ImageExtensions } from '../../../../core/models';
import { AwsHelper } from '../../aws';
import { ValidationException } from '../../exceptions';

export const imageFileFilter = (
  req,
  file: File,
  callback,
  property: string[] = [],
  isRequired = false,
) => {
  if (!file) {
    if (isRequired) {
      return callback(
        new ValidationException({ message: 'Image is required', property }),
        false,
      );
    }
    return callback(null, true);
  }

  const fileExt = AwsHelper.fileFormat(file.originalname);

  if (fileExt && ImageExtensions.includes(fileExt.toLocaleLowerCase())) {
    return callback(null, true);
  }

  return callback(
    new ValidationException({ message: 'Only images are allowed', property }),
    false,
  );
};
