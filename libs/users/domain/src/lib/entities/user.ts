import { Permission } from './permission';
import { JobPosition } from './job-position';

export interface User {
  id: string;
  email: string;
  name?: string;
  permissions: Permission[];
  position?: JobPosition;
}
