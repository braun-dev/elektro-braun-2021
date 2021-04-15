import { JobPosition, Permission } from '@elektro-braun/users/domain';

export interface CreateUserPayload {
  email: string;
  password: string;
  permissions: Permission[];
  name?: string;
  position: JobPosition;
}
