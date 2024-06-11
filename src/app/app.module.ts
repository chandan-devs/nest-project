import { Module } from "@nestjs/common";
import { PostsModule } from "src/posts/posts.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema } from "src/posts/database/schema/postSchema";

@Module({
  imports: [
    PostsModule,
    // MongooseModule.forRoot( process.env.MONGO_URL),
    MongooseModule.forRoot("mongodb+srv://chandanguptadevs:12345@cluster0.ecyf2rj.mongodb.net/"),
    
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
