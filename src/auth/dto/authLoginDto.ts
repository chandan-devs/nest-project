import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
  @IsNotEmpty({ message: "email is required" })
  @IsString()
  email: string;

  @IsNotEmpty({ message: "password is required" })
  @IsString()
  password: string;
}
