import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserResponseDto } from './dtos';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data): Promise<UserResponseDto> {
    const passwordHash = await hash(data.password, 10);
    data.password = passwordHash;

    const user: UserDocument = new this.userModel(data);

    await user.save();

    return {
      id: user.id,
      email: user.email,
      document: user.document,
      fullName: user.fullName,
      address: user.address || undefined,
    };
  }
}
