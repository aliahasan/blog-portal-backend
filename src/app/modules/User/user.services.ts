import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import User from './user.model';

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TUser) => {
  const { email, password } = payload;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'User not found. before login you must register an account'
    );
  }
  const checkedPassword = await User.isPasswordMatched(
    password,
    user?.password
  );
  if (!checkedPassword) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload = {
    userId: user._id,
    role: user?.role,
    email: user?.email,
  };
  const expiresIn = config.jwt_expires_in as string;
  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn,
  });
  return {
    token: accessToken,
  };
};

export const userServices = {
  createUser,
  loginUser,
};
