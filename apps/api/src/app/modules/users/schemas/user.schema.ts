import { prop } from '@typegoose/typegoose';
import { TimeTrackingPermissionModel } from './time-tracking-permission.schema';
import { CompanyPositionModel } from './company-position.schema';

export class UserModel {
  id!: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, type: () => TimeTrackingPermissionModel })
  permissions: TimeTrackingPermissionModel[];

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  position: CompanyPositionModel;
}
