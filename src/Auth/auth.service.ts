import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { UserAuthResponseDto, AuthDto } from './dtos';
import { User, UserDocument } from '../User/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: AuthDto): Promise<UserAuthResponseDto> {
    const user: UserDocument = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password: currentPasword } = user.toObject();

    const valid = await compare(password, currentPasword);

    if (!valid) {
      throw new NotFoundException('User not found');
    }

    const payload = { fullName: user.fullName, sub: user.id };
    const token: string = this.jwtService.sign(payload, {
      secret: 'hola_1234',
    });

    return {
      token,
      id: user.id,
      email: user.email,
      document: user.document,
      fullName: user.fullName,
      address: user.address || undefined,
    };
  }

  async validateUser(id: string): Promise<UserAuthResponseDto> {
    const user: UserDocument = await this.userModel.findById(id);

    return {
      id: user.id,
      token: undefined,
      email: user.email,
      document: user.document,
      fullName: user.fullName,
      address: user.address || undefined,
    };
  }
}
