import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactsFilterParams } from '../utils/parseContactsFilterParams.js';
import { fieldList } from '../constans/fieldList.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getAllContactsController = async (req, res, next) => {
  const { query } = req;
  const userId = req.user._id;
  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query, fieldList);
  const { contactType, isFavorite } = parseContactsFilterParams(query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    contactType,
    isFavorite,
    userId,
  });

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

export const getContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  const contact = await getContact({ _id: contactId, userId });

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
  const { _id: userId } = req.user;

  let photo = '';

  if (req.file) {
    photo = await saveFileToUploadDir(req.file, 'photo');
  }

  const contact = await addContact({ ...req.body, userId, photo });

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

export const patchContactController = async (req, res) => {
  const userId = req.user._id;

  let photo = '';

  if (req.file) {
    photo = await saveFileToUploadDir(req.file, 'photo');
  }

  const { contactId } = req.params;
  const result = await updateContact(
    { _id: contactId, userId },
    { ...req.body, photo },
  );

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  const result = await deleteContact({ _id: contactId, userId });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).json({
    status: 204,
  });
};
