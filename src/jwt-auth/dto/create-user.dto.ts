import { IsEmail, IsString, MinLength,IsOptional,IsEnum  } from "class-validator";
import { UserRole } from "../user.entity";

export class CreateUserDto{


@IsString()
Name:string

@IsEmail()
email:string

@MinLength(6)

password:string

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

}

