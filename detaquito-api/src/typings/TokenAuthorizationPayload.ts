export interface TokenAuthorizationPayload {
  accessToken: string;
  refreshToken: string;
  cookieExpiry: number;
  accessTokenExpiryInSeconds: number;
  refreshTokenExpiryInSeconds: number;
}
