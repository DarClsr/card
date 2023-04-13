import { DocumentType, Prop, ReturnModelType, modelOptions, Ref } from '@typegoose/typegoose';


export enum MenuType {
    GROUP = "group", //分组
    MENU = "menu", //菜单
    PAGE = "page" //分组
}

@modelOptions({
    schemaOptions: {
      timestamps: true,
      toJSON: {
        getters: true,
      },
    },
  })
export class Menu {
  @Prop()
  name: string;
  @Prop()
  type: MenuType;
  @Prop({ref:()=>Menu})
  parent?:Ref<Menu>;
  @Prop()
  path?:string
  @Prop()
  icon?:string
}
export type MenuDocument = DocumentType<Menu>;
export class MenuModel {}
export class BaseMenuModel extends MenuModel {}
export interface MenuModel extends ReturnModelType<typeof Menu> {}

