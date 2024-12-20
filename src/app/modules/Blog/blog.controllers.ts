import { StatusCodes } from 'http-status-codes';
import tryCatchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogServices } from './blog.services';

const handleCreateBlog = tryCatchAsync(async (req, res) => {
  const { userId: author } = req.user;
  const blogData = { ...req.body, author };
  const result = await blogServices.createBlog(blogData);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const handleUpdateBlog = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const blogData = req.body;
  const result = await blogServices.updateBlog(id, req.user, blogData);

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const handleDeleteBlog = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const result = await blogServices.deleteBlog(id, userId);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const handleGetallBlogs = tryCatchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogs(req.query);
  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const blogControllers = {
  handleCreateBlog,
  handleGetallBlogs,
  handleUpdateBlog,
  handleDeleteBlog,
};
