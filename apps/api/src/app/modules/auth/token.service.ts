import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtDocument, JwtModel } from './schemas/jwt.schema';
import { User } from '@elektro-braun/shared/util-data';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(JwtModel.collectionName) private jwtModel: Model<JwtDocument>
  ) {}

  async createTokens(user: User): Promise<JwtModel> {
    const tokens = await this.generateTokens(user.id, user.email)
    const jwt = new this.jwtModel({ userId: user.id, token: tokens.token, refreshToken: tokens.refreshToken });
    return jwt.save();
  }

  private async generateTokens(userId: string, email: string): Promise<{ token: string; refreshToken: string; }> {
    const payload = { sub: userId, email };
    const token = this.jwtService.sign(payload);
    return { token, refreshToken: '' };
  }
}
