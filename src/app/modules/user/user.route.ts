import express from 'express';
// import validateRequest from '../../middlewares/validationRequest';
// import { UserValidation } from './user.validation';
// import { UserController } from './user.controller';

const router = express.Router();

// router.post(
//   '/signup',
//   validateRequest(UserValidation.createUserZodSchema),
//   UserController.createUserToDB
// );

export const UserRoutes = router;
