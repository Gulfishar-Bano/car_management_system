import { InputType, PartialType } from '@nestjs/graphql';
import { CreateDriver } from './create-driver.dto';

@InputType()
export class UpdateDriver extends PartialType(CreateDriver) {


}
2