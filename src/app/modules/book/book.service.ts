/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericPagination } from '../../../interfaces/common';
import { IPagination } from '../../../interfaces/pagination';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';
import { BookSearchableFields } from './book.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import config from '../../../config';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);

const insertBook = async (book: IBook): Promise<IBook | null> => {
  try {
    if (book.image) {
      // Decode base64 image data
      const decodedImage = Buffer.from(book.image, 'base64');

      console.log('decodedImage', decodedImage);

      // Generate a unique filename using UUID
      const filename = `${uuidv4()}.png`;

      // Define the path to save the image
      const imagePath = path.join(__dirname, '../../../images', filename);

      await writeFileAsync(imagePath, decodedImage); // Use await here

      // Create a URL pointing to the saved image
      const imageUrl = `http://localhost:${config.port}/images/${filename}`;

      console.log('Coverted Url', imageUrl);
      book = {
        ...book,
        image: imageUrl,
      };

      const result = (await Book.create(book)).populate('seller');
      return result;
    } else {
      const result = (await Book.create(book)).populate('seller');
      return result;
    }
  } catch (error) {
    if ((error as any).code === 11000) {
      // Duplicate key error (if title is not unique)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Title must be unique');
    }
    throw error;
  }
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPagination
): Promise<IGenericPagination<IBook[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePaginations(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: BookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).populate({ path: 'seller' });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The book is not found!');
  }

  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  insertBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
