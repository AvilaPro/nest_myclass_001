//13.2.1
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators';
import { Role } from 'src/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const tieneRol = requiredRoles.some((role) => user.roles?.includes(role));
    if (!tieneRol) {
      throw new HttpException(
        'No tiene el rol permitido',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return tieneRol;
  }
}
