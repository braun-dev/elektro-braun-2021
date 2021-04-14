import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SCHEMA_CONFIG } from '../../../config/constants';

export type TimeReportDocument = TimeReportModel & Document;

@Schema(SCHEMA_CONFIG)
export class TimeReportModel {
  static collectionName = 'timereports';
  id?: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: String, required: true })
  employeeId: string;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  regular: number;

  @Prop({ required: true, default: 0 })
  overtime: number;

  @Prop({ required: true, default: 0 })
  compTime: number;

  @Prop({ required: true, default: 0 })
  sickLeave: number;

  @Prop({ required: true, default: 0 })
  holiday: number;

  @Prop()
  description: string;
}

export const TimeReportSchema = SchemaFactory.createForClass(TimeReportModel);
