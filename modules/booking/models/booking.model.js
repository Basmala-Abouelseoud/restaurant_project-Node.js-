import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { 
  type: String, 
  required: true,
  match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'] 
},
  persons: { type: Number, required: true, min: 1, max: 4 }
}, { timestamps: true , collection: 'bookings'});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;