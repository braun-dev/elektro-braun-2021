import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: UserModel.collectionName, schema: UserSchema }])
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UserModule {}
