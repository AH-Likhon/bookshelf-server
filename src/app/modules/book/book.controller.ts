import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { IBook } from './book.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/responseData';
import { BookService } from './book.service';

const insertBookToDB = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = await req.body;
  //   console.log('info', 'Body User:', { bookData });

  const result = await BookService.insertBook(bookData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book inserted successfully',
    data: result,
  });
});

export const BookController = {
  insertBookToDB,
};
