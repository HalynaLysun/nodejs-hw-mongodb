import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { findUser, signup } from '../services/auth.js';
import { createSession } from '../services/session.js';

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

  const { accessToken, refreshToken, _id, refreshTokenValidUntil } =
    await createSession(user._id);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: accessToken,
    },
  });
};
