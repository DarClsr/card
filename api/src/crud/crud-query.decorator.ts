import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const CrudQuery = createParamDecorator((data, ctx: ExecutionContext) => {
  const qs = ctx.switchToHttp().getRequest().query.query;
  let query = {};
  try {
    query = JSON.parse(qs, (key, value) => {
      // console.log([key, value])
      // empty array
      if (Array.isArray(value) && value.length === 0) {
        return undefined;
      }
      // empty object
      if (value && typeof value === 'object' && Object.entries(value).length === 0) {
        return undefined;
      }
      // empty
      if (value === '' || value === null) {
        return undefined;
      }
      if(value === 'null') {
        return null
      }
      return value
    });
  } catch (e) {
    query = {};
  }
  // console.log(query)
  return query;
})