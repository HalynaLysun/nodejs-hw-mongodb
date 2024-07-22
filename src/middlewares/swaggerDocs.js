import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

import { SWAGGER_PATH } from '../constans/contacts.js';

export const swaggerDocs = () => {
  try {
    console.log(SWAGGER_PATH, swaggerDoc);
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    console.log('1');
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
