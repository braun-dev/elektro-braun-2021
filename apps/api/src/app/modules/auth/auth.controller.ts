import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthenticatedUser } from '@elektro-braun/shared/util-data';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthResponse } from '@elektro-braun/auth/domain';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiResponse } from '@elektro-braun/shared/util-networking';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req): Promise<ApiResponse<AuthResponse>> {
    const { user, tokens } = await this.authService.login(req.user);
    return {
      status: 'success',
      statusCode: 200,
      data: {
        user: user,
        token: tokens.token
      }
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthenticatedUser> {
    return await this.authService.register(createUserDto);
  }
}
