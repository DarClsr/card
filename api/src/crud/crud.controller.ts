import { Body, Controller, Delete, Get, Param, Post, Put, Query, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CrudQuery } from './crud-query.decorator';
import { CrudService } from './crud.service';


export class CrudController {
  constructor(
    public service: CrudService,
    public age
    ) { }

  @Get()
  list(@CrudQuery() query) {
    return this.service.find(query);
  }

  @Get('/count')
  @SetMetadata('Permission', null)
  count(@CrudQuery() query) {
    return this.service.count(query);
  }
g
  @Get('/options')
  @SetMetadata('Permission', null)
  async getOptions(@CrudQuery() query) {
    const data=await this.service.getOptions(query);
    return data
  }

  @Get('/:id')
  detail(@Param('id') id: string,@Query() query) {
    return this.service.findById(id,query);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() body) {
    return this.service.update(id, body);
  }

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

}
