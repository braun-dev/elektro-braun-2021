import { Module } from '@nestjs/common';
import { UserModel } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  controllers: [UserController],
  imports: [
    TypegooseModule.forFeature([{ typegooseClass: UserModel, schemaOptions: { collection: 'users' }}]),
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UserModule {}
