import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Post extends Document {
  @Prop()
  title: string;
  @Prop()
  date: string;
  @Prop()
  body: string;
  @Prop()
  category: string;
}

const PostSchema = SchemaFactory.createForClass(Post);
export { PostSchema };
