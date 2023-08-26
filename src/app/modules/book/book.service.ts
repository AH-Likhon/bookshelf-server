import { IBook } from './book.interface';
import { Book } from './book.model';

const insertBook = async (book: IBook): Promise<IBook | null> => {
  const result = await Book.create(book);
  return result;
};

export const BookService = {
  insertBook,
};
