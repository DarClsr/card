import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const Auth = (...args: string[]) => SetMetadata('auth', args);

export const LocalAuthGuard = () => applyDecorators(UseGuards(AuthGuard('local')));
export const JwtAuthGuard = (rbac = false) => {
  console.log("rabc")
  const guards: any[] = [
    AuthGuard('jwt')
  ] 
  
  return applyDecorators(UseGuards(...guards))
};
export const Me = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});