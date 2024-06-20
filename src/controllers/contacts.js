import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();

    if (contacts.length === 0) {
      next(createHttpError(404, 'Contacts not found'));
      return;
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.message = 404;
    }
    next(error);
  }
};
