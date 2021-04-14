import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TimeTrackingPermissionModel, TimeTrackingPermissionSchema } from './time-tracking-permission.schema';
import { CompanyPositionModel, CompanyPositionSchema } from './company-position.schema';
import { Document } from 'mongoose';

export type UserDocument = UserModel & Document;

@Schema()
export class UserModel {
  static collectionName = 'users';
  id?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: [TimeTrackingPermissionSchema] })
  permissions: TimeTrackingPermissionModel[];

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: CompanyPositionSchema })
  position: CompanyPositionModel;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
