import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "src/common/entity/user.entity";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService
    // private readonly createUserDto: CreateUserDto
  ) {}
  // create user
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  // get all user
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // update user
  @Patch(':id')
  update(@Body() createUserDto: CreateUserDto, @Param("id") id: number){
    return this.userService.update(id, createUserDto)
  }
}
