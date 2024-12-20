import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import Blog from '../Blog/blog.model';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';

const updateUser = async (
  payload: Partial<TUser>,
  userId: string,
  admin: JwtPayload
) => {
  const authAmin = await User.findById(admin?.userId);
  if (!authAmin || authAmin.role !== 'admin' || admin?.role !== 'admin') {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not allowed to access this recourse'
    );
  }
  const blockedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  }).select('-password');
  if (!blockedUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return blockedUser;
};

const deleteBlog = async (id: string, admin: JwtPayload) => {
  const authAmin = await User.findById(admin?.userId);
  if (!authAmin || authAmin.role !== 'admin' || admin?.role !== 'admin') {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not allowed to access this recourse'
    );
  }
  const deleteBlog = await Blog.findByIdAndDelete(id);
  if (!deleteBlog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return;
};

export const authServices = {
  updateUser,
  deleteBlog,
};
