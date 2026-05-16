import Contact from '../models/contact.model.js';

export const createContact = async (data) => {
  const contact = new Contact(data);
  return await contact.save();
};

export const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

