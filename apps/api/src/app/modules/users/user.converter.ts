import { UserModel } from './schemas/user.schema';
import { User } from '@elektro-braun/users/domain';

export class UserConverter {
  static fromModel(model: UserModel): User {
    return {
      id: model.id,
      email: model.email,
      name: model.name,
      permissions: model.permissions,
      position: {
        name: model.position.name ?? '',
        description: model.position?.description
      }
    }
  }
}
