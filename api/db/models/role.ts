import {
  DocumentType,
  Prop,
  ReturnModelType,
  modelOptions,
  Ref,
} from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import { Menu } from './menu';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  },
})
export class Role {
  @Prop()
  key: string;

  @Prop()
  name: string;

  // 接口权限
  @Prop()
  permission?: any[];

  // 菜单权限
  @Prop({ ref: () => Menu })
  menus?: Ref<Menu>[];
}
export type RoleDocument = DocumentType<Role>;
export class RoleModel {}
export class BaseRoleModel extends RoleModel {}
export interface RoleModel extends ReturnModelType<typeof Role> {}
