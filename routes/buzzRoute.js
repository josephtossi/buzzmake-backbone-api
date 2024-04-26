const express = require('express');
const router = express.Router();
const buzzController = require('../controllers/buzzController.js')
const { verifyAccessToken } = require('../helpers/jwt_helper.js')

router.get('/', verifyAccessToken, buzzController.getbuzzes);

router.get('/:id', verifyAccessToken, buzzController.getBuzz);

router.post('/', verifyAccessToken, buzzController.postBuzz);

router.put('/:id', verifyAccessToken, buzzController.editBuzz);

router.delete('/:id', verifyAccessToken, buzzController.deleteBuzz);

module.exports = router;