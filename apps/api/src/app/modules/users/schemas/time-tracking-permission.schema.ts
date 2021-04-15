import { prop } from '@typegoose/typegoose';

export class TimeTrackingPermissionModel {
  @prop({ required: true })
  name: string;

  @prop()
  description: string;
}
