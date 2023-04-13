import { applyDecorators, Get, SetMetadata } from '@nestjs/common';
import { CrudController } from './crud.controller';

export interface CrudOptions {
  /**
   * Resource Name
   */
  name?: string
}

export const Crud = (options: CrudOptions = {}): ClassDecorator => {
  const name = options.name

  return (target: Function) => {
    const crud = CrudController
    const crudProto = CrudController.prototype;
    const cls = target
    const proto = target.prototype
    // SetMetadata('crudOptions', options)(proto)
    // Reflect.defineMetadata()

    for (let prop in Object.getOwnPropertyDescriptors(crudProto)) {
      if (prop === 'constructor') continue;
      if (proto[prop]) continue;
      const crudMethod = Object.getOwnPropertyDescriptor(crudProto, prop)
      Object.defineProperty(proto, prop, crudMethod);

      const method = Object.getOwnPropertyDescriptor(proto, prop)
      Reflect.defineMetadata('Permission', `${name}.${prop}`, proto, prop);
      // Reflect.defineMetadata('Permission', `${name}.${prop}`, method.);


      Reflect.getMetadataKeys(crud, prop).forEach(key => {
        const meta = Reflect.getMetadata(key, crud, prop)
        Reflect.defineMetadata(key, meta, target, prop);
      })

      Reflect.getMetadataKeys(crudProto, prop).forEach(key => {
        const meta = Reflect.getMetadata(key, crudProto, prop)
        Reflect.defineMetadata(key, meta, proto, prop);
      })

      Reflect.getMetadataKeys(crudMethod.value).forEach(key => {
        const meta = Reflect.getMetadata(key, crudMethod.value)
        Reflect.defineMetadata(key, meta, proto, prop);
        // Reflect.defineMetadata(key, meta, method.value);
      })
    }
  }
}

