import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(requireRoles, 'requiredRoles');

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    const hasRole = () =>
      requireRoles.some((role) => {
        console.log(user.roles, role);
        return user?.roles?.includes(role);
      });

    const valid = user && user.roles && hasRole();

    if (!valid)
      throw new ForbiddenException(
        "You don't have permission to access this route",
      );

    return true;
  }
}
