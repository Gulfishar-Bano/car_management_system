
import { IsString, IsNotEmpty,  Length} from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  @Length(2,10)
  name: string;
 
}
