import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MenuModel } from 'db/models';
import { UserModel } from 'db/models/user';

@Injectable()
export class AuthService {
  constructor(
    public userModel: UserModel,
    public menuModel: MenuModel,
    private jwtService: JwtService,
  ) {}

  async register(body) {
    console.log(body);
  }

  async validateUser(body) {
    const user = await this.userModel.findOne({
      email: body.email,
    });

    if (!user) {
      throw new BadRequestException('邮箱尚未注册');
    }
    return user;
  }

  async login(body) {
    const user = await this.validateUser(body);
    return {
      user: user,
      token: this.jwtService.sign(
        {
          _id: user._id,
        },
        {
          expiresIn: '7d',
        },
      ),
    };
  }

  async getMenus(user) {
    const user_info = await user.populate({
      path: 'role',
      populate: [
        {
          path: 'menus',
        },
      ],
    });
    const data = user_info.toJSON()?.role?.menus ?? [];
    return data;
  }
}
