import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

const { PORT = 3000 } = process.env;

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  //   app.get('/api/contacts', (req, res) => {
  //     res.json(contacts);
  //   });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
