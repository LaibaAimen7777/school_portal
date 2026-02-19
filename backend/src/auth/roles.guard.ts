import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    console.log('context:', context);
    console.log('context.gethandler():', context.getHandler());
    console.log('reflector:', this.reflector);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    console.log('user:', user);

    return requiredRoles.includes(user.role);
  }
}
