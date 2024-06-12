import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { PostSchema } from "./database/schema/postSchema";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Post", schema: PostSchema }])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
