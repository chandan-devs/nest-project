import { Module } from "@nestjs/common";
import { PostsModule } from "src/posts/posts.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema } from "src/posts/database/schema/postSchema";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "src/user/user.module";
import { User } from "src/common/entity/user.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
    UserModule,
    AuthModule,
    // MongooseModule.forRoot( process.env.MONGO_URL),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "socialmedia",
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
