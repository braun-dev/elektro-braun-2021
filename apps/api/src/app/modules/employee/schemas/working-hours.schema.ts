import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SCHEMA_CONFIG } from '../../../config/constants';

export type WorkingHoursDocument = WorkingHoursModel & Document;

@Schema(SCHEMA_CONFIG)
export class WorkingHoursModel {
  @Prop({ required: true, default: 8 })
  monday: number;

  @Prop({ required: true, default: 8 })
  tuesday: number;

  @Prop({ required: true, default: 8 })
  wednesday: number;

  @Prop({ required: true, default: 8 })
  thursday: number;

  @Prop({ required: true, default: 6.5 })
  friday: number;

  @Prop({ required: true, default: 0 })
  saturday: number;

  @Prop({ required: true, default: 0 })
  sunday: number;
}

export const WorkingHoursSchema = SchemaFactory.createForClass(WorkingHoursModel);
