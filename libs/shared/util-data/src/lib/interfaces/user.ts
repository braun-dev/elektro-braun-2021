import { CompanyPosition } from './company-position';
import { Permission } from './permission';

export interface User {
  id: string;
  email: string;
  name?: string;
  permissions: Permission[];
  position?: CompanyPosition;
}
