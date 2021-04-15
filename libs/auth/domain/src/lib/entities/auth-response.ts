import { User } from '@elektro-braun/users/domain';

export interface AuthResponse {
  user: User;
  token: string;
}
