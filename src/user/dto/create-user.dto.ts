import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "firstname is required" })
  firstName: string;

  @IsNotEmpty({ message: "lastname is required" })
  lastName: string;

  @IsNotEmpty({ message: "email is required" })
  @IsString()
  email: string;

  @IsNotEmpty({ message: "password is required" })
  @IsString()
  password: string;

  @IsNotEmpty({ message: "isActive is required" })
  @IsBoolean()
  isActive: boolean;
}
