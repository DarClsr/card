import {
  BadRequestException,
  Get,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard, Me } from './auth.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { arrayToTree } from 'performant-array-to-tree';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  @LocalAuthGuard()
  async login(@Body() body) {
    return this.service.login(body);
  }

  @Post('register')
  async register(@Body() body) {
    return await this.service.register(body);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async loginout(@Body() body) {
    return {
      status: true,
    };
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  async getInfo(@Me() user) {
    return await user.populate("role");
  }
  @Get('menu')
  @UseGuards(JwtAuthGuard)
  async loadMenu(@Me() user) {
    const data=await this.service.getMenus(user)
    const menus = arrayToTree(data, {
      parentId: 'parent',
      id: '_id',
      dataField: null,
    });
    return menus;
  }


  @Get('permission')
  @UseGuards(JwtAuthGuard)
  async loadPermission(@Me() user) {
    const cur_user=await user.populate("role");
    return cur_user?.role?.permission;
  }
}
