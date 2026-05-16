import Booking from '../models/booking.model.js';
import AppError from '../../../utils/response.js';
import { ERROR_CODES } from '../../../utils/errorCodes.js';

export const createBooking = async (data, userId) => {
  const booking = new Booking({ ...data, user: userId });
  return await booking.save();
};

export const getAllBookings = async () => {
  return await Booking.find()
    .populate('user', 'name email')
    .sort({ date: 1 });
};

export const getBookingById = async (id) => {
  const booking = await Booking.findById(id).populate('user', 'name email');
  if (!booking) throw new AppError(ERROR_CODES.NOT_FOUND);
  return booking;
};

export const getMyBookings = async (userId) => {
  return await Booking.find({ user: userId }).sort({ date: 1 });
};

// الأدمن: يقدر يكونفرم أو يكنسل أي حجز
export const confirmBooking = async (id) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new AppError(ERROR_CODES.NOT_FOUND);

  if (booking.status === 'cancelled') {
    throw new AppError({
      ...ERROR_CODES.VALIDATION_ERROR,
      developerMessage: 'Cannot confirm a cancelled booking',
    });
  }

  if (booking.status === 'confirmed') {
    throw new AppError({
      ...ERROR_CODES.VALIDATION_ERROR,
      developerMessage: 'Booking is already confirmed',
    });
  }

  return await Booking.findByIdAndUpdate(
    id,
    { status: 'confirmed' },
    { new: true, runValidators: false }
  );
};

export const cancelBookingByAdmin = async (id) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new AppError(ERROR_CODES.NOT_FOUND);

  if (booking.status === 'cancelled') {
    throw new AppError({
      ...ERROR_CODES.VALIDATION_ERROR,
      developerMessage: 'Booking is already cancelled',
    });
  }

 return await Booking.findByIdAndUpdate(
  id,
  { status: 'cancelled' },
  { new: true, runValidators: false }
);
};

// اليوزر: يقدر يكنسل بس لو الحجز pending وفيه أكتر من 24 ساعة
export const cancelBookingByUser = async (id, userId) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new AppError(ERROR_CODES.NOT_FOUND);

  // تحقق إن الحجز بتاعه هو
  if (!booking.user || booking.user.toString() !== userId.toString()) {
  throw new AppError(ERROR_CODES.FORBIDDEN);
  }

  if (booking.status === 'cancelled') {
    throw new AppError({
      ...ERROR_CODES.VALIDATION_ERROR,
      developerMessage: 'Booking is already cancelled',
    });
  }

  if (booking.status === 'confirmed') {
    throw new AppError({
      ...ERROR_CODES.VALIDATION_ERROR,
      developerMessage: 'Cannot cancel a confirmed booking, please contact us',
    });
  }

  // تحقق إن فيه أكتر من 24 ساعة على الموعد
  const bookingDateTime = new Date(booking.date);
  const [hours, minutes] = booking.time.split(':');
  bookingDateTime.setHours(Number(hours), Number(minutes), 0, 0);

  const hoursUntilBooking = (bookingDateTime - new Date()) / (1000 * 60 * 60);

  if (hoursUntilBooking < 24) {
    throw new AppError({
      ...ERROR_CODES.FORBIDDEN,
      developerMessage: 'Cannot cancel booking less than 24 hours before the reservation',
    });
  }

 return await Booking.findByIdAndUpdate(
  id,
  { status: 'cancelled' },
  { new: true, runValidators: false }
);
};

export const deleteBooking = async (id) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new AppError(ERROR_CODES.NOT_FOUND);
  await booking.deleteOne();
};