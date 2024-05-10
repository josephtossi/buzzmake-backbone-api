const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Operations related to authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 *       400:
 *         description: Bad request, invalid input
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized, invalid credentials
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: refreshToken
 *         description: Refresh token
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             refreshToken:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully refreshed access token
 *       400:
 *         description: Bad request, invalid refresh token
 */
router.post('/refresh-token', authController.refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   delete:
 *     summary: Log out
 *     tags: [Authentication]
  *     parameters:
 *       - in: body
 *         name: refreshToken
 *         description: Refresh token
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             refreshToken:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.delete('/logout', authController.logout);

module.exports = router;
