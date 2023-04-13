import { DocumentType, Prop, ReturnModelType, modelOptions } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';


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


  @Prop()
  permission?:any[]

}
export type RoleDocument = DocumentType<Role>;
export class RoleModel {}
export class BaseRoleModel extends RoleModel {}
export interface RoleModel extends ReturnModelType<typeof Role> {}

