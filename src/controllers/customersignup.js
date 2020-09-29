const customer = require('../models/customer');
const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');

exports.getCustomerById = async (req, res, next, id) => {
  try {
    await customer.findById(id).exec((error, customer) => {
      if (error || !customer) {
        return res.status(400).json({
          error: 'Customer not exist',
        });
      }
      req.customerData = customer;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.insertCustomer = async (req, res) => {
  try {
    const { mobileNumber, email, referarCode } = req.body;

    // check if same mobile already exists
    let mobileCheck = await customer.findOne({ mobileNumber });
    if (mobileCheck) {
      return res.status(400).json({
        error: 'Mobile already exists',
      });
    }
    // check if same email already exists
    let emailCheck = await customer.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({
        error: 'Email already exists',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const encry_password = await bcrypt.hash(req.body.password, salt);

    // TODO
    // check if unique referral id is generated and check if it exists or not
    const uniqueReferralCode = uniqid.time().toUpperCase();
    // insert into store table
    const newCustomer = new customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobileNumber: req.body.mobileNumber,
      encryptPassword: encry_password,
      email: req.body.email,
      gender: req.body.gender,
      dob: req.body.dob,
      referralCode: uniqueReferralCode,
      status: req.body.status,
      // TODO
      //registeredFrom: req.body.registeredFrom, // admin, ios, android, msite, website
    });
    // if referarCode is not empty check if customer exists or not
    if (referarCode && referarCode != '') {
      let referarCustomer = await customer.findOne({ referarCode });
      if (referarCustomer) {
        newCustomer.referarId = referarCustomer._id;
        newCustomer.referarCode = referarCode;
      } else {
        return res.status(400).json({
          error: 'Referrar Customer not exist',
        });
      }
    }
    newCustomer.save((error, data) => {
      if (error) {
        return res.status(400).json({
          error: 'Not able to insert user in DB - customer',
        });
      }
      res.json({
        error: null,
        data: {
          message: 'Customer added successfully',
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    await customer.find().exec((error, customers) => {
      if (error || !customers) {
        return res.status(400).json({
          error: 'Customers not found',
        });
      }
      res.json({
        error: null,
        data: {
          customers,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    return res.json({
      error: null,
      data: req.customerData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    let updateCustomer = await customer.findByIdAndUpdate(
      { _id: req.customerData._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (updateCustomer) {
      res.status(201).json({
        error: null,
        data: updateCustomer,
      });
    } else {
      return res.status(400).json({
        error: 'Customer not updated. Please try again',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
