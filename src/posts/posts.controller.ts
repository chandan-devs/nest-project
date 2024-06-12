import { Body, Controller, Get, Post, Put, Param, Delete } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostModel } from "./dto/posts.interface";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // create post
  @Post()
  create(@Body() post: PostModel) {
    const newPost = this.postsService.create(post);
    return {
      statusCode: 201,
      message: "Post created successfully",
      data: newPost,
    };
  }
  // get all posts
  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();
    return {
      statusCode: 200,
      message: "Posts fetched successfully",
      data: posts,
    };
  }
  // update post
  // @Put(":id")
  // update(@Body() post: PostModel, @Param("id") id: number) {
  //   const updatedPost = this.postsService.update(+id, post);
  //   return {
  //     statusCode: 200,
  //     message: "Post updated successfully",
  //     data: updatedPost,
  //   };
  // }
  // get post by id
  // @Get(":id")
  // getPostById(@Param("id") id: number) {
  //   const getPost = this.postsService.getPostById(+id);
  //   return {
  //     statusCode: 200,
  //     message: "Post fetched successfully",
  //     data: getPost,
  //   };
  // }
  // delete post
  // @Delete(":id")
  // delete(@Param("id") id: number) {
  //   this.postsService.delete(+id);
  //   return {
  //     statusCode: 200,
  //     message: "Post deleted successfully",
  //   };
  // }
}
