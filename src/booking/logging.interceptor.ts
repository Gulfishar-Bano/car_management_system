import { NestInterceptor,ExecutionContext,CallHandler, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs";
import {map} from "rxjs/operators";


@Injectable()
export class SimpleInterceptor implements NestInterceptor{

intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    
 


 return next.handle().pipe(
    map((data)=>{
     if(data || typeof data ==="object"){


        return{
          ...data,
          responsetime:new Date().toISOString()
        }
     }
    })
 )


}



}


