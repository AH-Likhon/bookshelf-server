import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericPagination } from '../../../interfaces/common';
import { IPagination } from '../../../interfaces/pagination';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';
import { BookSearchableFields } from './book.constant';

const insertBook = async (book: IBook): Promise<IBook | null> => {
  const result = await Book.create(book);
  return result;
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

export const BookService = {
  insertBook,
  getAllBooks,
};
