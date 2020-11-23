const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/admin/checkadminauth');
const {
  //insertWallet,
  //getWallet,
  updateWallet,
} = require('../controllers/wallet');

//router.post('/', verifyToken, insertWallet);

//router.get('/', verifyToken, getWallet);

router.put('/', verifyToken, updateWallet);

module.exports = router;
