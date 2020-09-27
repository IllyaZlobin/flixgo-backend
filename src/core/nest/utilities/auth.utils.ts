import * as bcrypt from 'bcrypt';

export const validateHash = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const result = await bcrypt.compare(password, hash);

  return result;
};
