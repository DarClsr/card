import { Controller } from '@nestjs/common';
import { Crud } from 'src/crud';
import { PermissionService } from './permission.service';

@Controller('permission')
@Crud({name:"permission"})
export class PermissionController {
    constructor(
        private service:PermissionService
    ){}
}
