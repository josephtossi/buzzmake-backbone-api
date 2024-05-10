const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController.js');
const { verifyAccessToken } = require('../helpers/jwt_helper.js');

/**
 * @swagger
 * tags:
 *   name: Offers
 *   description: Operations related to offers
 */

/**
 * @swagger
 * /api/offer:
 *   post:
 *     summary: Send an offer
 *     tags: [Offer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buzzId:
 *                 type: string
 *                 description: ID of the buzz to send the offer for
 *               price:
 *                 type: number
 *                 description: Price offered for the buzz
 *     responses:
 *       200:
 *         description: Offer sent successfully
 *       404:
 *         description: Buzz not found
 */
router.post('/', verifyAccessToken, offerController.sendOffer);

module.exports = router;
