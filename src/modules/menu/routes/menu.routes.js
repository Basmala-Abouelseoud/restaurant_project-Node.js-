import express from 'express';
import * as controller from '../controllers/menu.controller.js';
import { protect, adminOnly } from '../../auth/middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';
import { validateMenu, validateMenuUpdate } from '../middleware/menu.validation.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Menu management API
 */

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: List of all menu items
 */
router.get('/menu', controller.getAll);

/**
 * @swagger
 * /menu/{id}:
 *   get:
 *     summary: Get menu item by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "661f1b2e8f1b2c001e8d4567"
 *     responses:
 *       200:
 *         description: Menu item details
 *       404:
 *         description: Not found
 */
router.get('/menu/:id', controller.getById);

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Create menu item (Admin only)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [productName, productPrice, productCategory, productDescription, image]
 *             properties:
 *               productName:
 *                 type: string
 *                 example: Margherita Pizza
 *               productPrice:
 *                 type: number
 *                 example: 12.99
 *               productCategory:
 *                 type: string
 *                 example: Pizza
 *               productDescription:
 *                 type: string
 *                 example: Classic pizza with tomato sauce and mozzarella
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       422:
 *         description: Validation error
 */
router.post('/menu', protect, adminOnly, upload.single('image'), validateMenu, controller.create);

/**
 * @swagger
 * /menu/{id}:
 *   put:
 *     summary: Update menu item (Admin only)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "661f1b2e8f1b2c001e8d4567"
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productPrice:
 *                 type: number
 *               productCategory:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation error
 */
router.put('/menu/:id', protect, adminOnly, upload.single('image'), validateMenuUpdate, controller.update);

/**
 * @swagger
 * /menu/{id}:
 *   delete:
 *     summary: Delete menu item (Admin only)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "661f1b2e8f1b2c001e8d4567"
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.delete('/menu/:id', protect, adminOnly, controller.remove);

export default router;