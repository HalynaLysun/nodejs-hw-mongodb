import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
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

export const signinController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    next(createHttpError(401, 'Email is invalid'));
    return;
  }

  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) {
    next(createHttpError(401, 'Password invalid'));
    return;
  }

  const accessToken = 4688.766676;
  const refreshToken = 56488.56877;

  res.status(201).json({
    status: 201,
    message: 'Successfully logged in an user!',
    refreshToken,
    data: {
      accessToken,
    },
  });
};
