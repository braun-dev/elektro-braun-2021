import { prop } from '@typegoose/typegoose';

export class WorkingHoursModel {
  @prop({ required: true, default: 8 })
  monday!: number;

  @prop({ required: true, default: 8 })
  tuesday!: number;

  @prop({ required: true, default: 8 })
  wednesday!: number;

  @prop({ required: true, default: 8 })
  thursday!: number;

  @prop({ required: true, default: 6.5 })
  friday!: number;

  @prop({ default: 0})
  saturday?: number;

  @prop({ default: 0 })
  sunday?: number;
}
