import { Injectable } from '@nestjs/common';
import { UserModel } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(UserModel) private readonly userModel: ReturnModelType<typeof UserModel>) {}

  async getAll(): Promise<UserModel[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string | { email: string }): Promise<UserModel | undefined> {
    return this.userModel.findOne(typeof email === 'string' ? { email } : email);
  }

  async insert(userDto: CreateUserDto): Promise<UserModel> {
    const createUser = new this.userModel({ ...userDto });
    return createUser.save()
  }
}
