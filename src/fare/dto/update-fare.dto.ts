import { PartialType } from "@nestjs/mapped-types";
import { CreateFare } from "./create-fare.dto";


export class UpdateFare extends PartialType(CreateFare){
    
}