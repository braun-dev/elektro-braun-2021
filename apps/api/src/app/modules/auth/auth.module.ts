import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { BcryptService } from './bcrypt.service';
import { TokenService } from './token.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModel, JwtSchema } from './schemas/jwt.schema';

@Module({
  controllers: [
    AuthController
  ],
  imports: [
    UserModule,
    PassportModule,
    MongooseModule.forFeature([{ name: JwtModel.collectionName, schema: JwtSchema }]),
    JwtModule.register({
      secret: 'test123',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    BcryptService,
    TokenService
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
