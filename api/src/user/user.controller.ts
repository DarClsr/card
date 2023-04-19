import { Controller,UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Crud } from 'src/crud/crud.decorator';
import { UserService } from './user.service';

@Controller('user')
@Crud({ name: 'user' })
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
export class UserController {
  constructor(private service: UserService) {}
}
