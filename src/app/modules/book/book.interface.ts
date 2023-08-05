import { Model } from 'mongoose';

type IReview = {
  rating: number;
  reviewText: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: IReview[];
};

export type IBookFilters = {
  title?: string;
  author?: string;
  genre?: string;
  publicationDate?: string;
};

export type CowModel = Model<IBook, Record<string, unknown>>;
