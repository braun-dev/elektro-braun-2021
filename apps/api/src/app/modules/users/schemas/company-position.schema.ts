import { prop } from '@typegoose/typegoose';

export class CompanyPositionModel {
  @prop({ required: true })
  name: string;

  @prop()
  description: string;
}
