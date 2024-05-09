const express = require('express');
const router = express.Router();

const buzzController = require('../controllers/buzzController.js');
const { verifyAccessToken } = require('../helpers/jwt_helper.js');
const upload = require('../helpers/file_uploader_helper.js')

router.get('/', verifyAccessToken, buzzController.getBuzzes);
router.get('/:id', verifyAccessToken, buzzController.getBuzz);
router.post('/', verifyAccessToken, upload.singleFileUpload, buzzController.postBuzz);
router.put('/:id', verifyAccessToken, buzzController.editBuzz);
router.delete('/:id', verifyAccessToken, buzzController.deleteBuzz);
router.get('/uploads/:filename', buzzController.getFile);

module.exports = router;