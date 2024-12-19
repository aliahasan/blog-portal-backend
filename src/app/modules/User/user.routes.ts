import { Router } from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { userControllers } from './user.controllers';
// import { userValidations } from './user.validation';

const router = Router();

router.post(
  '/register',
  //   validateRequest(userValidations.userValidationSchema),
  userControllers.handleCreateUser
);

export const userRoutes = router;
