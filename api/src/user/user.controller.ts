import { Controller,UseGuards,Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Crud } from 'src/crud/crud.decorator';
import { UserService } from './user.service';

@Controller('user')
@Crud({ name: 'user' })
@UseGuards(JwtAuthGuard,RolesGuard)
export class UserController {
  constructor(private service: UserService) {}
//   @Get()
// @UseGuards(RolesGuard)
//   async find(){
//     return this.service.model.find()
//   }
}
