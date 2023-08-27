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

router.get('/:id', auth(), BookController.getSingleBookFromDB);

router.get('/', auth(), BookController.getAllBooksFromDB);

export const BookRoutes = router;
