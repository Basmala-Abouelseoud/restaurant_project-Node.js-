import express from 'express';
import * as controller from '../controllers/menu.controller.js';
import { protect, adminOnly } from '../../auth/middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';
import { validateMenu } from '../middleware/menu.validation.js';

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
 *         description: Success
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
 *     responses:
 *       200:
 *         description: Success
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
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
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
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.put('/menu/:id', protect, adminOnly, upload.single('image'), controller.update);

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
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/menu/:id', protect, adminOnly, controller.remove);

export default router;