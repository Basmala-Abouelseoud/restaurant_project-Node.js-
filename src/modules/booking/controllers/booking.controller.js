import * as bookingService from '../services/booking.service.js';
import { successResponse } from '../../../utils/response.js';

export const create = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body, req.user.id);
    return successResponse(res, {
      message: 'Booking created successfully',
      data: booking,
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const bookings = await bookingService.getAllBookings();
    return successResponse(res, {
      message: 'Bookings retrieved successfully',
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    return successResponse(res, {
      message: 'Booking retrieved successfully',
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getMyBookings(req.user.id);
    return successResponse(res, {
      message: 'Your bookings retrieved successfully',
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const booking = await bookingService.confirmBooking(req.params.id);
    return successResponse(res, {
      message: 'Booking confirmed successfully',
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

export const cancelByAdmin = async (req, res, next) => {
  try {
    const booking = await bookingService.cancelBookingByAdmin(req.params.id);
    return successResponse(res, {
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

export const cancelByUser = async (req, res, next) => {
  try {
    const booking = await bookingService.cancelBookingByUser(req.params.id, req.user.id);
    return successResponse(res, {
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await bookingService.deleteBooking(req.params.id);
    return successResponse(res, {
      message: 'Booking deleted successfully',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};