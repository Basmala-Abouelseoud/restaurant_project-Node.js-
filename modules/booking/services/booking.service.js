import Booking from '../models/booking.model.js';

export const createBooking = async (data) => {
  const booking = new Booking(data);
  return await booking.save();
};

export const getAllBookings = async () => {
  return await Booking.find().sort({ date: 1 });
};

export const getBookingById = async (id) => {
  return await Booking.findById(id);
};

export const deleteBooking = async (id) => {
  const booking = await Booking.findById(id);
  if (!booking) return null;
  await booking.deleteOne();
  return true;
};