const express = require('express');
const router = express.Router();
const buzzTypesController = require('../controllers/buzzTypesController.js');
const { verifyAccessToken } = require('../helpers/jwt_helper.js');

/**
 * @swagger
 * tags:
 *   name: BuzzTypes
 *   description: Operations related to buzz types
 */

/**
 * @swagger
 * /api/buzz-types:
 *   get:
 *     summary: Get all buzz types
 *     tags: [BuzzTypes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of buzz types
 */
router.get('/', verifyAccessToken, buzzTypesController.getBuzzTypes);

/**
 * @swagger
 * /api/buzz-types:
 *   post:
 *     summary: Add a new buzz type
 *     tags: [BuzzTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: New buzz type added successfully
 */
router.post('/', verifyAccessToken, buzzTypesController.addBuzzType);

/**
 * @swagger
 * /api/buzz-types/{id}:
 *   delete:
 *     summary: Delete a buzz type
 *     tags: [BuzzTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the buzz type to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Buzz type deleted successfully
 */
router.delete('/:id', verifyAccessToken, buzzTypesController.deleteBuzzType);

module.exports = router;
