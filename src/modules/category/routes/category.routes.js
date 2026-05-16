import express from 'express';
import * as controller from '../controllers/category.controller.js';
import { validateCategory, validateCategoryUpdate } from '../middleware/category.validation.js';
import { protect, adminOnly } from '../../auth/middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Menu Categories API
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of all categories
 */
router.get('/category', controller.getAll);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "661f1b2e8f1b2c001e8d4567"
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Not found
 */
router.get('/category/:id', controller.getById);

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a category (Admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, displayName]
 *             properties:
 *               name:
 *                 type: string
 *                 enum: [breakfast, drinks, maindishes, desserts]
 *                 example: breakfast
 *               displayName:
 *                 type: string
 *                 example: Breakfast
 *     responses:
 *       201:
 *         description: Created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       409:
 *         description: Already exists
 *       422:
 *         description: Validation error
 */
router.post('/category', protect, adminOnly, validateCategory, controller.create);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update a category (Admin only)
 *     tags: [Category]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 enum: [breakfast, drinks, maindishes, desserts]
 *               displayName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.put('/category/:id', protect, adminOnly, validateCategoryUpdate, controller.update);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete a category (Admin only)
 *     tags: [Category]
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - has linked menu items
 *       404:
 *         description: Not found
 */
router.delete('/category/:id', protect, adminOnly, controller.remove);

export default router;