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
 *     summary: Book a table
 *     tags: [Booking]
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
 *               phone:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               persons:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 4
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation error
 */
router.post('/booking', validateBooking, controller.create);

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
 *         description: Booking not found
 */
router.get('/booking/:id', protect, adminOnly, controller.getById);

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
 *         description: Booking not found
 */
router.delete('/booking/:id', protect, adminOnly, controller.remove);

export default router;