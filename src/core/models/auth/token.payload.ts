export interface ITokenPayload {
  id: number;
  email: string;
  role: string;
  type: 'access' | 'refresh';
  exp?: number;
  iat?: number;
}
