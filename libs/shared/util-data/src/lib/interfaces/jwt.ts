export interface Jwt {
  token: string;
  refreshToken?: string;
  expires?: number;
}
