const express = require('express');
const router = express.Router();

const buzzTypesController = require('../controllers/buzzTypesController.js');
const { verifyAccessToken } = require('../helpers/jwt_helper.js');

router.get('/', verifyAccessToken, buzzTypesController.getBuzzTypes);
router.post('/', verifyAccessToken, buzzTypesController.addBuzzType);
router.delete('/:id', verifyAccessToken, buzzTypesController.deleteBuzzType);

module.exports = router;