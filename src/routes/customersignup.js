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
router.post('/', insertCustomer);

// get all customer
//router.get('/', getAllCustomers);

// get single customer
router.get('/', getCustomer);

// update customer
router.put('/:id', updateCustomer);

module.exports = router;
