export interface JwtTokenPayload {
  email: string;
  avatar?: string;
  alias?: string;
  iat: number;
  exp: number;
  sub: string;
}
