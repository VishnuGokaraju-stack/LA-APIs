const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/admin/checkadminauth');
const { getWallet, updateWallet } = require('../controllers/wallet');

router.get('/', verifyToken, getWallet);

router.put('/', verifyToken, updateWallet);

module.exports = router;
