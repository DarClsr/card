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
export class User {
  @Prop()
  email: string;

  @Prop({
    select: false,
    get: (v) => v,
    set: (v) => hashSync(v, 10),
  })
  password: string;

}
export type UserDocument = DocumentType<User>;
export class UserModel {}
export class BaseUserModel extends UserModel {}
export interface UserModel extends ReturnModelType<typeof User> {}

