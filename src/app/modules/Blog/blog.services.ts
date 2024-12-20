import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../Builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (payload: TBlog) => {
  const result = (await Blog.create(payload)).populate({
    path: 'author',
    select: '-password',
  });
  return result;
};

const updateBlog = async (
  id: string,
  author: JwtPayload,
  payload: Partial<TBlog>
) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (
    blog.author.toString() !== author?.userId.toString() ||
    author?.role !== 'user'
  ) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this blog'
    );
  }
  //   Update the blog
  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate({
    path: 'author',
    select: '-password',
  });

  return updatedBlog;
};

const deleteBlog = async (id: string, userId: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  if (blog?.author.toString() !== userId.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this blog'
    );
  }
  await Blog.findByIdAndDelete(id);
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content'];
  const blogsQuery = new QueryBuilder(
    Blog.find().populate({
      path: 'author',
      select: '-password -role -isBlocked',
    }),
    query
  )
    .search(searchableFields)
    .sort()
    .filter();
  const blogs = await blogsQuery.queryModel;
  return blogs;
};

export const blogServices = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
