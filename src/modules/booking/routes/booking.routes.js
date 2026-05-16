import express from 'express';
import * as controller from '../controllers/booking.controller.js';
import { validateBooking } from '../middleware/booking.validation.js';
import { protect, adminOnly } from '../../auth/middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Table Booking API
 */

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Book a table (logged in users only)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, phone, date, time, persons]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 example: "+32471234567"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-04-01"
 *               time:
 *                 type: string
 *                 example: "19:30"
 *               persons:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 4
 *                 example: 2
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error
 */
router.post('/booking', protect, validateBooking, controller.create);

/**
 * @swagger
 * /booking/my:
 *   get:
 *     summary: Get my bookings (logged in user)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's bookings
 *       401:
 *         description: Unauthorized
 */
router.get('/booking/my', protect, controller.getMyBookings);

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Get all bookings (Admin only)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all bookings
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/booking', protect, adminOnly, controller.getAll);

/**
 * @swagger
 * /booking/{id}:
 *   get:
 *     summary: Get booking by ID (Admin only)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Not found
 */
router.get('/booking/:id', protect, adminOnly, controller.getById);

/**
 * @swagger
 * /booking/{id}/confirm:
 *   patch:
 *     summary: Confirm a booking (Admin only)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking confirmed
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.patch('/booking/:id/confirm', protect, adminOnly, controller.confirm);

/**
 * @swagger
 * /booking/{id}/cancel:
 *   patch:
 *     summary: Cancel a booking (Admin) or own booking (User - 24h before)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled
 *       403:
 *         description: Forbidden or less than 24h before booking
 *       404:
 *         description: Not found
 */
router.patch('/booking/:id/cancel/admin', protect, adminOnly, controller.cancelByAdmin);
router.patch('/booking/:id/cancel', protect, controller.cancelByUser);

/**
 * @swagger
 * /booking/{id}:
 *   delete:
 *     summary: Delete booking (Admin only)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
router.delete('/booking/:id', protect, adminOnly, controller.remove);

export default router;