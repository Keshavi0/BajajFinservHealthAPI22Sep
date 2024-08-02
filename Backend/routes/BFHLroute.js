const express = require('express');
const { BFHLGet,BFHLPost } = require('../controller/BFHLController');

const router = express.Router();

router.get('/', BFHLGet);
router.post('/', BFHLPost);

module.exports = router;
