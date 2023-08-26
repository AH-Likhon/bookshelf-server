import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookValidation.createBookZodSchema),
  auth(),
  BookController.insertBookToDB
);

export const BookRoutes = router;
