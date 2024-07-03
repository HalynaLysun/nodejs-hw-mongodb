import createHttpError from 'http-errors';
import { signup } from '../services/auth.js';

export const addUserController = async (req, res, next) => {
  const newUser = await signup(req.body);

  const data = {
    name: newUser.name,
    email: newUser.email,
  };

  //   if (!newUser) {
  //     next(createHttpError(404, 'User not added'));
  //     return;
  //   }

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};
