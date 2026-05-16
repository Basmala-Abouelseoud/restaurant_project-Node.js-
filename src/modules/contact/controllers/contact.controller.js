import * as contactService from '../services/contact.service.js';
import { successResponse } from '../../../utils/response.js';

export const create = async (req, res, next) => {
  try {
    const contact = await contactService.createContact(req.body);
    return successResponse(res, {
      message: 'Message sent successfully',
      data: contact,
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const contacts = await contactService.getAllContacts();
    return successResponse(res, {
      message: 'Messages retrieved successfully',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};