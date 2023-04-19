import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  Inject,
  SetMetadata,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getMetadataStorage } from 'class-validator';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RoleController } from 'src/role/role.controller';
export const Auth = (...args: string[]) => SetMetadata('auth', args);

export const LocalAuthGuard = () =>
  applyDecorators(UseGuards(AuthGuard('local')));
export const JwtAuthGuard = (rbac = false) => {
  console.log('rabc 66666');
  if (rbac) {
    console.log('权限检验');
  }
  const guards: any[] = [AuthGuard('jwt')];

  return applyDecorators(UseGuards(...guards));
};
export const Me = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export const GetPermissions = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    SetMetadata('permissions', 'custome-api');
    return request.path;
  },
);

export function Permissions(permissions: string = null): Function {
  return applyDecorators(
    SetMetadata('Permission', permissions)
  );
}

// function Permissions() {
//   return applyDecorators(
//     Get('ip-address'),
//     IpAddress(),
//   );
// }
