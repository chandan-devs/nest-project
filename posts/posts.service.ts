import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostModel } from "./dto/posts.interface";
import { Post } from "./database/schema/postSchema";
import { Model } from "mongoose";
import { Types } from "mongoose";

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
  public async create(post: PostModel) {
    // Check if a post with the same title already exists
    const existingPost = await this.postModel
      .findOne({ title: post.title })
      .exec();
    if (existingPost) {
      throw new UnprocessableEntityException("Post title already exists.");
    }

    // Create a new post instance
    const blogPost = new this.postModel({
      ...post,
    });

    // Save the new post to the database
    const savedPost = await blogPost.save();

    return { message: "Post created successfully", savedPost };
  }
  //   update()
  public async update(id: string, post: PostModel) {
    const objectId = new Types.ObjectId(id);
    const existingPost = await this.postModel.findOne({ _id: objectId });
    if (!existingPost) {
      throw new NotFoundException("Post not found.");
    }
    Object.assign(existingPost, post);
    await existingPost.save();

    return {
      message: "Post updated successfully",
      post: existingPost,
    };
  }
  // getPostById()
  public async getPostById(id: string): Promise<PostModel> {
    const objId = new Types.ObjectId(id);

    const post = await this.postModel.findOne({ _id: objId });

    if (!post) {
      throw new NotFoundException("Post not found.");
    }
    return post;
  }
  //   delete()
  public async deleteById(id: string): Promise<{ message: string }> {
    const objId = new Types.ObjectId(id);
    const findId = await this.postModel.findOne({ _id: objId });
    if (findId) {
      await this.postModel.deleteOne({ _id: id });
    } else {
      throw new NotFoundException("Post not found.");
    }
    return { message: "Post deleted successfully" };
  }
}
