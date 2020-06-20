import { QueryFailedError } from 'typeorm';

export interface DatabaseQueryError extends QueryFailedError {
  detail: string;
}
