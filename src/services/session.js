import { randomBytes } from 'node:crypto';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constans/auth.js';
import { Session } from '../db/models/session.js';

export const createSession = (userId) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFETIME);
  const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIFETIME);

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};
