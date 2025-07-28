import {  IsDateString, IsString, } from "class-validator";

export class CreateDriver{

    @IsString()
    firstName:string

    @IsString()
    lastName:string

    @IsString()
    licence:string

    @IsDateString()
    validity:string


}