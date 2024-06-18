import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';
import { getAllContacts, getContactById } from './services/contacts.js';

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

  app.get('/api/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    if (contacts.length === 0) {
      res.status(404).json({
        status: 404,
        message: 'Contacts not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/api/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
