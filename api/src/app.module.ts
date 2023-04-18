import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [CommonModule, UserModule, AuthModule, MenuModule, RoleModule, PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
