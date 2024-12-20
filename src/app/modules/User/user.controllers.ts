import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import tryCatchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.services';

const handleRegisterUser = tryCatchAsync(async (req, res) => {
  const data = req.body;
  const result = await userServices.createUser(data);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const handleLogin = tryCatchAsync(async (req, res) => {
  const result = await userServices.loginUser(req.body);
  const { token } = result;

  res.cookie('token', token, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
export const userControllers = {
  handleRegisterUser,
  handleLogin,
};
