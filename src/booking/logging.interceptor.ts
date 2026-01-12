import { NestInterceptor,ExecutionContext,CallHandler, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs";
import {map} from "rxjs/operators";


@Injectable()


   @Injectable()
@Injectable()
export class SimpleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // If it's a login response, it's an object with a 'token'. 
        // We shouldn't wrap that in 'results'.
        if (data && data.token) {
          return {
            ...data,
            responsetime: new Date().toISOString(),
          };
        }

        // If it's a list (like My Bookings), wrap it in results
        return {
          results: data,
          responsetime: new Date().toISOString(),
        };
      }),
    );
  }
}





