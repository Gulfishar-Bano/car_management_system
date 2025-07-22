import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CarBrandExternalService {

    constructor(private readonly httpService:HttpService){}

    async getCarsByMake(make:string){
  
        const response=await firstValueFrom(
         
            this.httpService.get("https://api.api-ninjas.com/v1/cars?make=toyota",{
            params:{make},
            headers:{

                'x-api-key':'X85s3Uo0/3W9uxGdvpvwDg==yq533Aiq9MkTNDJk'

            },

        }

            )



        )

        return response.data;

    }



}
