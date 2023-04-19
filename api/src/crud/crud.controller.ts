import { Body, Controller, Delete, Get, Param,applyDecorators, Post, Put, Query, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CrudQuery } from './crud-query.decorator';
import { CrudService } from './crud.service';
import { GetPermissions, Permissions } from 'src/auth/auth.decorator';

export class CrudController {
  constructor(
    public service: CrudService,
    public age
    ) { }

  @Get()
  @SetMetadata('permissions', "crud/read")
  list(@CrudQuery() query) {
    return this.service.find(query);
  }

  @Get('/count')
  @SetMetadata('Permission', 'crud/read')
  count(@CrudQuery() query) {
    return this.service.count(query);
  }
g
  @Get('/options')
  @SetMetadata('Permission', 'crud/read')
  async getOptions(@CrudQuery() query) {
    const data=await this.service.getOptions(query);
    return data
  }

  @Get('/:id')
  @SetMetadata('Permission', 'crud/read')
  detail(@Param('id') id: string,@Query() query) {
    return this.service.findById(id,query);
  }

  @Put('/:id')
  @SetMetadata('Permission', 'crud/edit')
  update(@Param('id') id: string, @Body() body) {
    return this.service.update(id, body);
  }

  @Post()
  @SetMetadata('Permission', 'crud/add')
  create(@Body() body) {
    return this.service.create(body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

}
