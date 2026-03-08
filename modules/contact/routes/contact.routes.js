import express from 'express';
import * as controller from '../controllers/contact.controller.js';
import { validateContact } from '../middleware/contact.validation.js';
import { protect, adminOnly } from '../../auth/middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact Us API
 */

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Send a message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, subject, message]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Validation error
 */
router.post('/contact', validateContact, controller.create);

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: Get all messages (Admin only)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all messages
 *       401:
 *         description: Unauthorized
 */
router.get('/contact', protect, adminOnly, controller.getAll);


export default router;