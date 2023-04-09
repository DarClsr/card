import { Global, Module, Provider, Scope } from '@nestjs/common';
import { buildSchema, getModelForClass, setGlobalOptions, Severity } from '@typegoose/typegoose';
import { MongooseModule } from '@nestjs/mongoose';
import * as models from './models'
import { underscore } from 'inflection'
import mongoose from 'mongoose';

// 必须在模型定义之前调用，否则无法正常使用
setGlobalOptions({
  schemaOptions: {
    id: false,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

const providers: Provider[] = [
    {
      provide: 'DbConnectionToken',
      useFactory: () => mongoose.connect(process.env.MONGO_URI)
    }
  ]

for (let model in models) {
    if (model.match(/^Base/)) continue
    if (!model.match(/Model$/)) continue
    const name = model.replace('Model', '')
    const collection = underscore(name)
    const ModelSchema = buildSchema(models[name], { collection })
    const Model = mongoose.model(name, ModelSchema)
    const BaseModel = models[`${model}`]
    if (BaseModel) {
      providers.push({
        provide: BaseModel,
        useValue: Model,
      })
    }
  }


  console.log(providers)


@Global()
@Module({
  imports: [],
  providers: [
    ...providers
  ],
  exports: [
    ...providers
  ],
})
export class DbModule { }
