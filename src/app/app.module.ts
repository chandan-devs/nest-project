import { Module } from "@nestjs/common";
import { PostsModule } from "src/posts/posts.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema } from "src/posts/database/schema/postSchema";

@Module({
  imports: [
    PostsModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: "Post", schema: PostSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
