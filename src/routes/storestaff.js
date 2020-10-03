const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/admin/checkadminauth');
const {
  insertStoreStaff,
  //getAllStoreStaff,
  getStoreStaff,
  updateStoreStaff,
} = require('../controllers/storestaff');
// validation for all apis
// const {
//   insertStaffValidate,
//   StoreStaffValidate,
//   updateStaffValidate,
// } = require('../validations/storestaff');

// insert staff
router.post('/', verifyToken, insertStoreStaff);

// get all staffs
//router.get('/', verifyToken, getAllStoreStaff);

// get single staff
router.get('/', verifyToken, getStoreStaff); // query params - id, name, mobile, store

// update staff
router.put('/', verifyToken, updateStoreStaff);

// delete staff
//router.delete("/:id", deleteCat);

module.exports = router;
