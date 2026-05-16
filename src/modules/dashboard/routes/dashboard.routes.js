import express from 'express';
import * as controller from '../controllers/dashboard.controller.js';
import { protect, adminOnly } from '../../auth/middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Admin Dashboard API
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard stats (Admin only)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   type: object
 *                   properties:
 *                     totalBookings:
 *                       type: integer
 *                     confirmedBookings:
 *                       type: integer
 *                     cancelledBookings:
 *                       type: integer
 *                     todayBookings:
 *                       type: integer
 *                     totalContacts:
 *                       type: integer
 *                     totalUsers:
 *                       type: integer
 *                 latestBookings:
 *                   type: array
 *                 latestContacts:
 *                   type: array
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/dashboard', protect, adminOnly, controller.getStats);

export default router;