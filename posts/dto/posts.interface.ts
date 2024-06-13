import { IsNotEmpty, IsString, IsOptional, IsDate } from "class-validator";

export class PostModel {
  @IsOptional()
  id?: number;

  @IsNotEmpty({ message: "Date is required" })
  // @IsDate()
  date: string;

  @IsNotEmpty({ message: "Title is required"})
  @IsString()
  title: string;

  @IsNotEmpty({ message: "Body is required"})
  @IsString()
  body: string;

  @IsNotEmpty({ message: "Category is required"})
  @IsString()
  category: string;
}
