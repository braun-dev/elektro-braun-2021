import { prop } from '@typegoose/typegoose';

export class JwtModel {
  id?: string;

  @prop({ required: true })
  token: string;

  @prop({ default: '' })
  refreshToken: string;

  @prop({ required: true })
  userId: string;

  @prop()
  expires: number;
}
