const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.get('/getImages', imageController.getImages);
router.get('/v2/getImages', imageController.getImagesV2);

module.exports = router;