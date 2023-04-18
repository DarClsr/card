import {
  DocumentType,
  Prop,
  ReturnModelType,
  modelOptions,
} from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';

enum ACTIONS {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  },
})
export class Permission {
  // 权限名称
  @Prop()
  name: string;
  // 资源
  @Prop({})
  source: ACTIONS[];
  //  操作
  @Prop()
  actions: string[];
}
export type PermissionDocument = DocumentType<Permission>;
export class PermissionModel {}
export class BasePermission extends PermissionModel {}
export interface PermissionModel extends ReturnModelType<typeof Permission> {}
