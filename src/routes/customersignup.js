const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/admin/checkadminauth');

const {
  getCustomerById,
  insertCustomer,
  //getAllCustomers,
  getCustomer,
  updateCustomer,
} = require('../controllers/customersignup');

router.param('id', getCustomerById);

// insert new customer
router.post('/', verifyToken, insertCustomer);

// get all customer
//router.get('/', verifyToken, getAllCustomers);

// get single customer
router.get('/', verifyToken, getCustomer);

// update customer
router.put('/:id', verifyToken, updateCustomer);

module.exports = router;
