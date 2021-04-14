import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedUser, User } from '@elektro-braun/shared/util-data';
import { UsersService } from '../users/user.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { TokenService } from './token.service';
import { JwtModel } from './schemas/jwt.schema';
import { UserModel } from '../users/schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    private bcryptService: BcryptService
  ) {}

  async getUser(credentials: LoginUserDto): Promise<UserModel> {
    // find user
    const user: UserModel = await this.userService.findOne(credentials.email);
    if (!user || !user.id) {
      throw new NotFoundException(`Could not find an account for ${credentials.email} - Please register first!`);
    }

    // check password
    const matches = await this.bcryptService.compare(credentials.password, user.password);
    if (!matches) {
      throw new UnauthorizedException('Password is not correct');
    }

    return user;
  }

  async login(user: User): Promise<AuthenticatedUser> {
    const tokens = await this.tokenService.createTokens(user);
    return { ...user, tokens };
  }

  async register(createUserDto: CreateUserDto): Promise<AuthenticatedUser> {
    const hashedPassword = await this.bcryptService.hash(createUserDto.password);

    // save user to DB
    const registeredUser = await this.userService.insert({ ...createUserDto, password: hashedPassword });
    if (!registeredUser || !registeredUser.id) {
      throw new InternalServerErrorException(`Could not create account for ${createUserDto.email}!`);
    }

    // generate JWTs
    const tokens: JwtModel = await this.tokenService.createTokens({
      id: registeredUser.id || (registeredUser as any)?._id,
      email: registeredUser.email,
      name: registeredUser.name,
      permissions: registeredUser.permissions,
      position: registeredUser.position
    });
    if (!tokens) {
      throw new InternalServerErrorException('Could not create JWTs');
    }

    return {
      id: registeredUser.id,
      email: registeredUser.email,
      name: registeredUser.name,
      permissions: registeredUser.permissions,
      position: registeredUser.position,
      tokens: {
        token: tokens.token,
        refreshToken: tokens.refreshToken,
        expires: tokens.expires ?? 0
      }
    };
  }
}
