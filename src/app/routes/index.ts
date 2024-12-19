import { Router } from 'express';
import { blogRoutes } from '../modules/Blog/blog.routes';
import { userRoutes } from '../modules/User/user.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/auth',
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
