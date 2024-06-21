import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  addContact,
} from '../services/contacts.js';
// import { ContactsCollection } from '../db/models/contact.js';

export const getAllContactsController = async (req, res, next) => {
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
};

export const getContactByIdController = async (req, res, next) => {
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
};

export const addContactController = async (req, res, next) => {
  const contact = await addContact(req.body);

  if (!contact) {
    next(createHttpError(404, 'Contact not added'));
    return;
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};
