const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/admin/checkadminauth');
const {
  insertStaff,
  //getAllStaff,
  getStaff,
  updateStaff,
} = require('../controllers/staff');
// validation for all apis
// const {
//   insertStaffValidate,
//   StoreStaffValidate,
//   updateStaffValidate,
// } = require('../validations/storestaff');

// insert staff
router.post('/', insertStaff);

// get all staffs
//router.get('/', getAllStaff);

// get single staff
router.get('/', getStaff); // query params - id, name, mobile, store

// update staff
router.put('/', updateStaff);

// delete staff
//router.delete("/:id", deleteCat);

module.exports = router;
