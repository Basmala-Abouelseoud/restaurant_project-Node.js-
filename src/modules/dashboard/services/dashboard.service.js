import Booking from '../../booking/models/booking.model.js';
import Contact from '../../contact/models/contact.model.js';
import User from '../../auth/models/user.model.js';

export const getStats = async () => {
  // نحسب اليوم بتوقيت UTC بشكل صريح
  const now = new Date();
  const todayStart = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0, 0
  ));
  const todayEnd = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    23, 59, 59, 999
  ));

  const [
    totalBookings,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
    todayBookings,
    totalContacts,
    totalUsers,
  ] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: 'pending' }),
    Booking.countDocuments({ status: 'confirmed' }),
    Booking.countDocuments({ status: 'cancelled' }),
    Booking.countDocuments({ date: { $gte: todayStart, $lte: todayEnd } }),
    Contact.countDocuments(),
    User.countDocuments({ role: 'user' }),
  ]);

  return {
    totalBookings,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
    todayBookings,
    totalContacts,
    totalUsers,
  };
};