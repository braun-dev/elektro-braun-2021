import { TimeTrackingPermissionModel } from '../schemas/time-tracking-permission.schema';
import { CompanyPositionModel } from '../schemas/company-position.schema';

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  permissions: TimeTrackingPermissionModel[];
  position?: CompanyPositionModel;
}
