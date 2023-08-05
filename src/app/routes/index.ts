import express from 'express';
// import { UserRoutes } from '../modules/user/user.route';

const routes = express.Router();

const collectionOfRoutes = [
  //   {
  //     path: '/auth',
  //     route: AuthRoutes,
  //   },
  //   {
  //     path: '/users',
  //     route: UserRoutes,
  //   }
];

collectionOfRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
