import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
// import { UserRoutes } from '../modules/user/user.route';

const routes = express.Router();

const collectionOfRoutes = [
  //   {
  //     path: '/login',
  //     route: UserRoutes,
  //   },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

collectionOfRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
