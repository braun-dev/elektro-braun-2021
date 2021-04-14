import { Controller } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UsersService) {}
}
