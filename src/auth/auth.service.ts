import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneDynamicField('username', username);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      _id: user._id,
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      age: user.age,
      avatar: user.avatar
    };

    return {
      token: this.jwtService.sign(payload),
      user: payload
    };
  }
}