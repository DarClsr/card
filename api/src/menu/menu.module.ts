import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService,UserService]
})
export class MenuModule {}
