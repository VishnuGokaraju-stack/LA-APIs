const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/admin/checkadminauth');
const {
  //getRatecardById,
  insertRateCard,
  getRateCard,
  updateRateCard,
} = require('../controllers/ratecard');
// validation

// insert ratecard
router.post('/', insertRateCard);
// get ratecard
router.get('/', getRateCard); // query params - id, name, mobile, store
// update ratecard
router.put('/', updateRateCard);

module.exports = router;
