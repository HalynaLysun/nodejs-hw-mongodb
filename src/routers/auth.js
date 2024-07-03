import { Router } from 'express';
import { userAddSchema } from '../validation/auth.js';
import { validateBody } from '../utils/validationBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { addUserController } from '../controllers/auth.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userAddSchema),
  ctrlWrapper(addUserController),
);
