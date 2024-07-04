import createHttpError from 'http-errors';
import { findUser, signup } from '../services/auth.js';

export const addUserController = async (req, res, next) => {
  const { email } = req.body;
  const user = await findUser({ email });
  if (user) {
    next(createHttpError(409, 'Email in use'));
    return;
  }

  const newUser = await signup(req.body);

  const data = {
    name: newUser.name,
    email: newUser.email,
  };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};
