import { z } from 'zod';
import { genres } from './book.constant';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
    author: z.string({
      required_error: 'Author is required!',
    }),
    genre: z.enum([...genres] as [string, ...string[]], {
      required_error: 'Genre is required!',
    }),
    publicationDate: z.string({
      required_error: 'Publication date is required!',
    }),
    reviews: z.array(
      z.object({
        rating: z.number().int({ message: 'Rating must be an integer' }),
        reviewText: z.string({
          required_error: 'Review text is required!',
        }),
      })
    ),
  }),
});

export const BookValidation = { createBookZodSchema };
