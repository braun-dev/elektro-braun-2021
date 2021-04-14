import { Jwt, User } from '@elektro-braun/shared/util-data';

export interface AuthenticatedUser extends User {
  tokens: Jwt;
}
