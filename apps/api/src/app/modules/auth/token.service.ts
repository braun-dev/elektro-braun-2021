import { Injectable } from '@nestjs/common';
import { TokenModel } from './schemas/token.schema';
import { User } from '@elektro-braun/shared/util-data';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(TokenModel) private jwtModel: ReturnModelType<typeof TokenModel>
  ) {}

  async createTokens(user: User): Promise<TokenModel> {
    const tokens = await this.generateTokens(user);
    const jwt = new this.jwtModel({ userId: user.id, token: tokens.token, refreshToken: tokens.refreshToken });
    return jwt.save();
  }

  async removeToken(userId: string, token: string): Promise<boolean> {
    return this.jwtModel.findOneAndDelete({ userId, token }).exec();
  }

  private async generateTokens(user: User): Promise<{ token: string; refreshToken: string; }> {
    const payload = { sub: user.id, user };
    const token = this.jwtService.sign(payload);
    return { token, refreshToken: '' };
  }
}
