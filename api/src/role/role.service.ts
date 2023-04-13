import { Injectable } from '@nestjs/common';
import { RoleModel } from 'db/models/role';
import { CrudService } from 'src/crud';

@Injectable()
export class RoleService extends CrudService {
    constructor(
        public model:RoleModel
    ){
        super(model)
    }
}
