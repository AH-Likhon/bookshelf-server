import { Model } from 'mongoose';

type IGenre =
  | 'Fiction'
  | 'Non-Fiction'
  | 'Mystery'
  | 'Thriller'
  | 'Science Fiction'
  | 'Fantasy'
  | 'Horror'
  | 'Romance'
  | 'Adventure'
  | 'Historical Fiction'
  | 'Biography'
  | 'Autobiography'
  | 'Self-Help'
  | 'Poetry'
  | 'Comedy'
  | 'Drama'
  | 'Action'
  | 'Crime'
  | 'Children'
  | 'Young Adult'
  | 'Graphic Novel'
  | 'Cookbook'
  | 'Travel'
  | 'Science'
  | 'History'
  | 'Philosophy'
  | 'Religion'
  | 'Art'
  | 'Music'
  | 'Sports'
  | 'Health'
  | 'Business'
  | 'Technology'
  | 'Education';

export type IReview = {
  rating: number;
  reviewText: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: IGenre;
  publicationDate: string;
  reviews: IReview[];
};

export type IBookFilters = {
  title?: string;
  author?: string;
  genre?: IGenre;
  publicationDate?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
