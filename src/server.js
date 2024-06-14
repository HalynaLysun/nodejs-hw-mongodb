import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

const { PORT = 3000 } = process.env;

export const setupServer = () => {
  const app = express();

  // const logger = pino({
  //   transport: {
  //     target: 'pino-pretty',
  //   },
  // });

  // app.use(logger);
  app.use('*', cors());

  //   app.get('/api/contacts', (req, res) => {
  //     res.json(contacts);
  //   });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(3000, () => console.log('Server is running on port 3000'));
};
