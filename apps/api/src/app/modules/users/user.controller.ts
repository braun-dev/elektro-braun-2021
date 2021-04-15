import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserModel } from './schemas/user.schema';
import { UserConverter } from './user.converter';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiResponse } from '@elektro-braun/shared/util-networking';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from '@elektro-braun/users/domain';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  async loadAll(): Promise<ApiResponse<User[]>> {
    const users: UserModel[] = await this.userService.getAll();
    return {
      data: users.map(user => UserConverter.fromModel(user)),
      status: 'success',
      statusCode: 200
    };
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<User>> {
    const createdUser = await this.userService.insert(createUserDto);
    return {
      data: UserConverter.fromModel(createdUser),
      status: 'success',
      statusCode: 200
    }
  }
}
