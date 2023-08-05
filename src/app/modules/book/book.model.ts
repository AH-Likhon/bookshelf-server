import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface'; // Import IBook and IReview interfaces
import { genres } from './book.constant';

const ReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
});

const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: genres,
    required: true,
  },
  publicationDate: {
    type: String,
    required: true,
  },
  reviews: [ReviewSchema], // Use the ReviewSchema to define the reviews array
});

export const Book = model<IBook, BookModel>('Book', BookSchema);
