import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { role_keys } from "./roles.decorator";
import { Observable } from "rxjs";

@Injectable()

export class RolesGuard implements CanActivate{

constructor(private reflector:Reflector){}

canActivate(context: ExecutionContext): boolean {
    const RequiredRoles=this.reflector.getAllAndOverride<string[]>(
     role_keys,[
        context.getHandler(),context.getClass()
     ]


    );

    if(!RequiredRoles)
    {
        return true;
    }

  const request=context.switchToHttp().getRequest();

  const user=request.user

  return RequiredRoles.includes(user.role)
}


}
