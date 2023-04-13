import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Me } from 'src/auth/auth.decorator';
import mongoose, { Mongoose } from 'mongoose';
import { query } from 'express';
import { Put } from '@nestjs/common/decorators';

@Controller('menu')
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(private service: MenuService) {}

  @Get()
  async find(@Query() query) {
    console.log(query);
    const data = await this.service.find();
    return {
      data,
    };
  }

  @Get('parents')
  async getParents(@Query() query) {
    let where: any = {};
    console.log({
      query
    })
    if (query._id) {
      where._id = {
        $ne: new mongoose.Types.ObjectId(query._id),
      };
      where.parent={
        $ne: new mongoose.Types.ObjectId(query._id),
      }
    }
    const data = await this.service.model.find({
      ...where,
    });
    return data.map((v) => {
      return {
        label: v.name,
        value: v._id,
      };
    });
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const data = await this.service.model.findById(id);
    return data;
  }

  @Put(':id')
  async updateOne(@Param('id') id,@Body() body) {
    const data = await this.service.model.findByIdAndUpdate(id,{
      $set:{
         ...body
      }
    });
    return data;
  }

  @Post()
  async save(@Body() body) {
    return await this.service.create(body);
  }
}
