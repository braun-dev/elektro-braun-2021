import { WorkingHoursModel } from './working-hours.schema';
import { prop, Ref } from '@typegoose/typegoose';
import { TimeReportModel } from '../../time-report/schemas/time-report.schema';

export class EmployeeModel {
  id?: string;

  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true })
  firstname: string;

  @prop({ required: true })
  lastname: string;

  @prop({ required: true })
  gender: string;

  @prop()
  mail: string;

  @prop()
  mail2: string;

  @prop()
  phone: string;

  @prop()
  phone2: string;

  @prop()
  country: string;

  @prop()
  street: string;

  @prop()
  houseNumber: string;

  @prop({ required: false })
  zipCode: number;

  @prop()
  city: string;

  @prop({ type: Date })
  dateOfBirth: Date;

  @prop({ type: Date })
  joiningDate: Date;

  @prop({ required: true })
  job: string;

  @prop({ default: 25 })
  holidayCredit: number;

  @prop()
  holidayCreditFirstYear: number;

  @prop({ default: 25 })
  availableHolidayCredit: number;

  @prop({ required: true })
  workingHours: WorkingHoursModel;

  @prop({ ref: () => TimeReportModel })
  lastRecordedDate?: Ref<TimeReportModel>;
}
