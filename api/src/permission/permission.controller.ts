import { Controller, Get } from '@nestjs/common';
import { Crud } from 'src/crud';
import { PermissionService } from './permission.service';

@Controller('permission')
@Crud({name:"permission"})
export class PermissionController {
    constructor(
        private service:PermissionService
    ){}


    @Get("options")
    async options(){
        const data=await this.service.model.find().lean();
        const  actions= [
            {
              label: "增加",
              value: "create",
            },
            {
              label: "删除",
              value: "delete",
            },
            {
              label: "编辑",
              value: "update",
            },
            {
              label: "查看",
              value: "read",
            },
          ];
        return data.map(v=>{
            return {
                label:v.name,
                value:v._id,
                children:v.actions.map(a=>{
                    return {
                        label:actions.find(s=>s.value==a)?.label ?? '',
                        value:`${v.source}:permission:${a}`
                    }
                })
            }
        })
    }
}
