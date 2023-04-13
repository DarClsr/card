import { Controller } from '@nestjs/common';
import { Crud } from 'src/crud';
import { RoleService } from './role.service';

@Controller('role')
@Crud({name:"role"})
export class RoleController {
    constructor(
        private service:RoleService
    ){}
}
