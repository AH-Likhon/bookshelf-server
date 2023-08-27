import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import { User } from '../modules/user/user.model';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get authorization token
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // Verify token
    let verifiedUser = null;

    verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.access_secret as Secret
    );

    req.user = verifiedUser;

    // Fetch the user's ID from the database based on their email
    const user = await User.findOne({ email: verifiedUser.email });

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
    }

    // Check if the logged-in user's ID matches the seller's ID in the request body
    if (req.body.seller && user._id.toString() !== req.body.seller.toString()) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "You're not authorized to perform this action"
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
