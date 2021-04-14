import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyPositionDocument = CompanyPositionModel & Document;

@Schema()
export class CompanyPositionModel {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const CompanyPositionSchema = SchemaFactory.createForClass(CompanyPositionModel);
