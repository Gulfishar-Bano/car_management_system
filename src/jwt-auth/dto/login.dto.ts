import { IsString, MinLength } from "class-validator";

export class loginDto{

@IsString()
email:string

@IsString()
@MinLength(6)
password:string


}