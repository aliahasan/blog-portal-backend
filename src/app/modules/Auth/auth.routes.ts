import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { authControllers } from './auth.controllers';
import { authValidations } from './auth.validation';

const router = Router();

router.patch(
  '/users/:userId/block',
  auth('admin'),
  validateRequest(authValidations.updateUserSchema),
  authControllers.handleUpdateUserInfo
);

router.delete('/blogs/:id', auth('admin'), authControllers.handleDeleteBlog);

export const authRoutes = router;
