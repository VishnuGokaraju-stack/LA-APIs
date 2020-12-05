const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/admin/checkadminauth');

const {
  insertCoupon,
  getCoupon,
  updateCoupon,
} = require('../controllers/coupon');

// insert new coupon
router.post('/', verifyToken, insertCoupon);

// get single coupon
router.get('/', verifyToken, getCoupon);

// update customer
router.put('/', verifyToken, updateCoupon);

module.exports = router;
