const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController.js');
const { verifyAccessToken } = require('../helpers/jwt_helper.js');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/', verifyAccessToken, userController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user object
 */
router.get('/:id', verifyAccessToken, userController.getUser);

/**
 * @swagger
 * /api/users/buzzes/{id}:
 *   get:
 *     summary: Get buzzes of a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of buzzes associated with the user
 */
router.get('/buzzes/:id', verifyAccessToken, userController.getUserBuzzes);

module.exports = router;
