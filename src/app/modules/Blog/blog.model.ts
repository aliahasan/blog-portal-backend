import mongoose, { Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 30,
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
});

const Blog = mongoose.model<TBlog>('Blog', blogSchema);
export default Blog;
