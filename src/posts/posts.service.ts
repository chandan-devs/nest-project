import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostModel } from "./dto/posts.interface";
import { Post } from "./database/schema/postSchema";
import { Model } from "mongoose";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>
  ) {}
  // private posts: Array<PostModel> = [];
  //   findAll()
  public async findAll(): Promise<PostModel[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }
  //   create()
  // public create(post: PostModel) {
  //   const titleExists: boolean = this.postModel.some(
  //     (item) => item.title === post.title
  //   );
  //   if (titleExists) {
  //     throw new UnprocessableEntityException("Post title already exists.");
  //   }
  //   const maxId: number = Math.max(...this.postModel.map((post) => post.id), 0);
  //   const id: number = maxId + 1;
  //   const blogPost: PostModel = {
  //     ...post,
  //     id,
  //   };
  //   this.posts.push(blogPost);
  //   return { message: "Post created successfully", blogPost };
  // }
  public async create(post: PostModel) {
    // Check if a post with the same title already exists
    const existingPost = await this.postModel
      .findOne({ title: post.title })
      .exec();
    if (existingPost) {
      throw new UnprocessableEntityException("Post title already exists.");
    }

    // Find the maximum id currently in the collection
    const maxPost = await this.postModel.findOne().sort({ id: -1 }).exec();
    const maxId = maxPost ? maxPost.id : 0;
    const id = maxId + 1;

    // Create a new post instance
    const blogPost = new this.postModel({
      ...post,
      id,
    });

    // Save the new post to the database
    await blogPost.save();

    return { message: "Post created successfully", blogPost };
  }
  //   update()
  // public async update(id: number, post: PostModel) {
  //   const postId = this.postModel.findOne((item) => item.id === id);

  //   if (postId) {
  //     throw new UnprocessableEntityException("Post not found.");
  //   }

  //   this.postModel[postId] = {
  //     ...post,
  //     id,
  //   };

  //   return {
  //     message: "Post updated successfully",
  //     post: this.posts[postIndex],
  //   };
  // }
  // getPostById()
  public async getPostById(id: number) {
    const post = await this.postModel.findOne({ id }).exec();

    if (!post) {
      throw new UnprocessableEntityException("Post not found.");
    }
    return post;
  }
  //   delete()
  public async deleteById(id: number): Promise<{ message: string }> {
    const findId = await this.postModel.findOne((item) => item._id === id);

    if (findId) {
      await this.postModel.deleteOne({ _id: id });
    } else {
      throw new UnprocessableEntityException("Post not found.");
    }
    return { message: "Post deleted successfully" };
  }
}
