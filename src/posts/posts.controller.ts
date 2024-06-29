import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostModel } from "./dto/posts.interface";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // create post
  @Post()
  create(@Body() post: PostModel) {
    return this.postsService.create(post);
  }
  // get all posts
  @Get()
  findAll() {
    return this.postsService.findAll();
  }
  // update post
  @Patch(":id")
  update(@Body() post: PostModel, @Param("id") id: string) {
    return this.postsService.update(id, post);
  }
  // get post by id
  @Get(":id")
  getPostById(@Param("id") id: string) {
    return this.postsService.getPostById(id);
  }
  // delete post
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.postsService.deleteById(id);
  }
}
