import { Router } from 'express';
import { authRoutes } from '../modules/Admin/auth.routes';
import { blogRoutes } from '../modules/Blog/blog.routes';
import { userRoutes } from '../modules/User/user.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/admin',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
