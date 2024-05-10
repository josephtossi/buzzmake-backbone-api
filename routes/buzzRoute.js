const express = require('express');
const router = express.Router();

const buzzController = require('../controllers/buzzController.js');
const { verifyAccessToken } = require('../helpers/jwt_helper.js');
const upload = require('../helpers/file_uploader_helper.js');

/**
 * @swagger
 * tags:
 *   name: Buzzes
 *   description: Operations related to buzzes
 */

/**
 * @swagger
 * /api/buzzes:
 *   get:
 *     summary: Get all buzzes
 *     description: Returns all buzzes
 *     tags: [Buzzes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of buzzes
 */
router.get('/', verifyAccessToken, buzzController.getBuzzes);

/**
 * @swagger
 * /api/buzzes/buzz-type/{buzzTypeId}:
 *   get:
 *     summary: Get buzzes by buzz type
 *     description: Returns buzzes of a specific type
 *     tags: [Buzzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: buzzTypeId
 *         required: true
 *         description: ID of the buzz type
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of buzzes
 */
router.get('/buzz-type/:buzzTypeId', verifyAccessToken, buzzController.getBuzzesOfType);

/**
 * @swagger
 * /api/buzzes/{id}:
 *   get:
 *     summary: Get a buzz by ID
 *     description: Returns a buzz by ID
 *     tags: [Buzzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the buzz
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single buzz object
 */
router.get('/:id', verifyAccessToken, buzzController.getBuzz);

/**
 * @swagger
 * /api/buzzes:
 *   post:
 *     summary: Create a new buzz
 *     description: Create a new buzz
 *     tags: [Buzzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               url:
 *                 type: string
 *               private:
 *                 type: boolean
 *               buzzType:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Created buzz object
 */
router.post('/', verifyAccessToken, upload.singleFileUpload, buzzController.postBuzz);

/**
 * @swagger
 * /api/buzzes/{id}:
 *   put:
 *     summary: Update a buzz
 *     description: Update a buzz by ID
 *     tags: [Buzzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the buzz
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               url:
 *                 type: string
 *               private:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated buzz object
 */
router.put('/:id', verifyAccessToken, buzzController.editBuzz);

/**
 * @swagger
 * /api/buzzes/{id}:
 *   delete:
 *     summary: Delete a buzz
 *     description: Delete a buzz by ID
 *     tags: [Buzzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the buzz
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Buzz deleted successfully
 */
router.delete('/:id', verifyAccessToken, buzzController.deleteBuzz);

/**
 * @swagger
 * /api/buzzes/uploads/{filename}:
 *   get:
 *     summary: Get a file associated with a buzz
 *     description: Returns a file associated with a buzz by filename
 *     tags: [Buzzes]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: Filename of the file associated with the buzz
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File retrieved successfully
 */
router.get('/uploads/:filename', buzzController.getFile);

module.exports = router;
