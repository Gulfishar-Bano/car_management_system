import { IsNumber,Min,Max, IsIn, IsOptional } from "class-validator";

export class UpdateMarkupDto {
 
  @IsOptional()
  @IsIn(['percentage','fixed'])
  type:'percentage'|'fixed'


    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    percentage: number;
  }
  