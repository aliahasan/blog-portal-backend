import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { blogControllers } from './blog.controllers';
import { blogValidations } from './blog.validation';

const router = Router();
router.post(
  '/',
  auth('user'),
  validateRequest(blogValidations.blogValidationSchema),
  blogControllers.handleCreateBlog
);

router.patch(
  '/:id',
  auth('user'),
  validateRequest(blogValidations.updateBlogValidationSchema),
  blogControllers.handleUpdateBlog
);

router.delete('/:id', auth('user'), blogControllers.handleDeleteBlog);

export const blogRoutes = router;
