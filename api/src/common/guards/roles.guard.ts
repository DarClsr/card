
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(request.user,"role check")
    // 当前请求所需权限
    if(user?.isSuper){
      Logger.warn('超级管理员不需要检验权限')
      return true;
    }

    const currentPerm = this.reflector.get<string>('permissions', context.getHandler());
    Logger.log(currentPerm, '当前所需权限:')
    // 标识不需要权限
    if (!currentPerm) {
      return true;
    }
    // if (this.config.get('permissions.close')) {
    //   Logger.warn('当前角色权限校验【已关闭】')
    // } else {
    //   Logger.log('当前角色权限校验【已开启】')
    //   // 根据用户id 查询所拥有的权限
    //   // const permList = await this.permSerivce.findUserPerms(user.id)
    //   // const perms: string[] = []
    //   // for (let i = 0, len = permList.length; i < len; i++) {
    //   //   permList[i]['m_perms'].indexOf(',') > -1 ? perms.push(...permList[i]['m_perms'].split(',')) : perms.push(permList[i]['m_perms'])
    //   // }
    //   //  匹配权限
    //   // if (perms.includes(currentPerm)) return true
    //   // throw new ForbiddenException()
    // }
    return true
  }
}
