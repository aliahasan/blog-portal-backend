import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userControllers } from './user.controllers';
import { userValidations } from './user.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidations.userValidationSchema),
  userControllers.handleRegisterUser
);
router.post(
  '/login',
  validateRequest(userValidations.loginValidationSchema),
  userControllers.handleLogin
);

export const userRoutes = router;
