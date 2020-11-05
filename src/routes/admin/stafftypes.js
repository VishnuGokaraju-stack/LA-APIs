const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middlewares/admin/checkadminauth');
const {
  getAllStaffTypes,
  insertStaffType,
} = require('../../controllers/admin/stafftypes');

router.get('/', getAllStaffTypes);
router.post('/', insertStaffType);
module.exports = router;
