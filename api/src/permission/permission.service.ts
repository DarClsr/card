import { Injectable } from '@nestjs/common';
import { PermissionModel } from 'db/models/permission';
import { CrudService } from 'src/crud';

@Injectable()
export class PermissionService extends CrudService {
    constructor(
        public model:PermissionModel
    ){
        super(model)
    }
}
