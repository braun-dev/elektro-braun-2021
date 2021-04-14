import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(UserModel.collectionName) private userModel: Model<UserDocument>,) {}

  async findOne(email: string | { email: string }): Promise<UserModel | undefined> {
    return this.userModel.findOne(typeof email === 'string' ? { email } : email);
  }

  async insert(userDto: CreateUserDto): Promise<UserModel> {
    const createUser = new this.userModel({ ...userDto });
    return createUser.save()
  }
}
