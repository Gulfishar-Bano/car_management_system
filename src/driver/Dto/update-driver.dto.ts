
import { PartialType } from "@nestjs/mapped-types";
import { CreateDriver } from "./create-driver.dto";

export class UpdateDriver extends PartialType(CreateDriver){
    
}
