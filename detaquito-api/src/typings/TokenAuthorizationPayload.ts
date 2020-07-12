export interface TokenAuthorizationPayload {
  accessToken: string;
  refreshToken: string;
  cookieExpiry: number;
  accessTokenExpiryInSeconds: number;
  refreshTokenExpiryInSeconds: number;
  id: number;
  alias: string;
  email: string;
  avatar: string;
}
