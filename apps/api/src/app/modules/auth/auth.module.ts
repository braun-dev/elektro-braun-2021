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
import { TokenModel } from './schemas/token.schema';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  controllers: [
    AuthController
  ],
  imports: [
    UserModule,
    PassportModule,
    TypegooseModule.forFeature([{ typegooseClass: TokenModel, schemaOptions: { collection: 'tokens'} }]),
    JwtModule.register({
      secret: '_elektro-braun_$%?_zeiterfassung!',
      signOptions: { expiresIn: '3600s' },
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
