import { PartialType } from "@nestjs/mapped-types";
import { InputType } from "@nestjs/graphql";
import { CreateFare } from "./create-fare.dto";



@InputType()
export class UpdateFare extends PartialType(CreateFare){
    
}