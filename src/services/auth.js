import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

import { env } from '../utils/env.js';
import { sendMail } from '../utils/sendMail.js';
import { SMTP } from '../constans/auth.js';

export const findUser = (filter) => User.findOne(filter);

export const findSession = (filter) => Session.findOne(filter);

export const signup = async (data) => {
  const { password } = data;
  const hashPass = await bcrypt.hash(password, 10);
  return User.create({ ...data, password: hashPass });
};

export const requestResetToken = async (email) => {
  const user = await findUser({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    { expiresIn: '15h' },
  );

  await sendMail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
  });
};
