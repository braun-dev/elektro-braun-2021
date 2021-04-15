import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from '@elektro-braun/shared/util-data';
import { UserModel } from '../users/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user: UserModel = await this.authService.getUser({ email, password });

    if (!user || !user.id) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      permissions: user.permissions,
      position: user.position,
    };
  }
}
