import { StatusCodes } from 'http-status-codes';
import tryCatchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.services';

const handleUpdateUserInfo = tryCatchAsync(async (req, res) => {
  const updatedUserInfo = req.body;
  const { userId } = req.params;
  const admin = req.user;
  const result = await authServices.updateUser(updatedUserInfo, userId, admin);
  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const handleDeleteBlog = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const admin = req.user;
  const result = await authServices.deleteBlog(id, admin);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const authControllers = {
  handleUpdateUserInfo,
  handleDeleteBlog,
};
