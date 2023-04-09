import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from 'src/common/guards/local.strategy';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from 'src/common/guards/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,UserService,JwtStrategy]
})
export class AuthModule {}
