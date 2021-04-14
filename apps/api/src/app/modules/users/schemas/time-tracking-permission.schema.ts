import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TimeTrackingPermissionDocument = TimeTrackingPermissionModel & Document;

@Schema()
export class TimeTrackingPermissionModel {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const TimeTrackingPermissionSchema = SchemaFactory.createForClass(TimeTrackingPermissionModel);
