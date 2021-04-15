import { prop } from '@typegoose/typegoose';

export class TimeReportModel {
  id!: string;

  @prop({ type: Date, required: true })
  date: Date;

  @prop({ required: true })
  employeeId: string;

  @prop({ required: true })
  total: number;

  @prop({ required: true })
  regular: number;

  @prop({ required: true, default: 0 })
  overtime: number;

  @prop({ required: true, default: 0 })
  compTime: number;

  @prop({ required: true, default: 0 })
  sickLeave: number;

  @prop({ required: true, default: 0 })
  holiday: number;

  @prop()
  description: string;
}
