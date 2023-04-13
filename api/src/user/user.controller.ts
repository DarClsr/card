import { Controller } from '@nestjs/common';
import { Crud } from 'src/crud/crud.decorator';
import { UserService } from './user.service';

@Controller('user')
@Crud({ name: 'user' })
export class UserController {
  constructor(private service: UserService) {}
}
