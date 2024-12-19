import mongoose, { Schema } from 'mongoose';
import { BlogModel, TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog, BlogModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model<TBlog, BlogModel>('Blog', blogSchema);
export default Blog;
