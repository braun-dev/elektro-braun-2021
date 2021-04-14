import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { WorkingHoursModel, WorkingHoursSchema } from './working-hours.schema';
import { SCHEMA_CONFIG } from '../../../config/constants';

export type EmployeeDocument = EmployeeModel & Document;

@Schema(SCHEMA_CONFIG)
export class EmployeeModel {
  static collectionName = 'employees';
  id?: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  phone: string;

  @Prop()
  mail: string;

  @Prop({ type: Date })
  joiningDate: Date;

  @Prop({ required: true, default: 25 })
  holidayCredit: number;

  @Prop({ required: false })
  holidayCreditFirstYear: number;

  @Prop({ required: true, default: 25 })
  availableHolidayCredit: number;

  @Prop({ type: WorkingHoursSchema, required: true, default: {} })
  workingHours: WorkingHoursModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TimeReport' })
  lastRecordedDate: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(EmployeeModel);
