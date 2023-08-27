import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { IBook } from './book.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/responseData';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { BookFilterableFields } from './book.constant';
import { paginationFields } from '../../../constants/pagination';

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

const getAllBooksFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  // console.log(filters);

  const result = await BookService.getAllBooks(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books successfully retrieved',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBookFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

export const BookController = {
  insertBookToDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
};
