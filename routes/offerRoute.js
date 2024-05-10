const express = require('express');
const router = express.Router();

const offerController = require('../controllers/offerController.js');
const { verifyAccessToken } = require('../helpers/jwt_helper.js');

router.post('/', verifyAccessToken, offerController.sendOffer);
module.exports = router;