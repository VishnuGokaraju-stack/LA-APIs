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
    if (!req.user) {
      return res.status(401).json({
        error: 'Not authorized to access !',
      });
    }
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
    //const encry_password = await bcrypt.hash(req.body.password, salt);

    // TODO
    // check if unique referral id is generated and check if it exists or not
    const uniqueReferralCode = uniqid.time().toUpperCase();
    // insert into store table
    const newCustomer = new customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobileNumber: req.body.mobileNumber,
      encryptPassword: '',
      email: req.body.email,
      gender: req.body.gender,
      dob: req.body.dob,
      referralCode: uniqueReferralCode,
      status: req.body.status,
      companyId: req.user.companyId,
      createdBy: req.user._id,
      createdType: req.user.userType, // staff, customer
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
    if (req.body.address) {
      newCustomer.address = req.body.address;
    }
    let insertCustomer = await newCustomer.save();
    if (insertCustomer) {
      res.status(200).json({
        error: null,
        data: {
          message: 'Customer added successfully',
        },
      });
    } else {
      return res.status(400).json({
        error: 'Something went wrong. Please try again - customer & address',
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// exports.getAllCustomers = async (req, res) => {
//   try {
//     await customer.find().exec((error, customers) => {
//       if (error || !customers) {
//         return res.status(400).json({
//           error: 'Customers not found',
//         });
//       }
//       res.json({
//         error: null,
//         data: {
//           customers,
//         },
//       });
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

exports.getCustomer = async (req, res) => {
  try {
    //console.log(req.query);
    //console.log(req.query.name);
    if (typeof req.query.name !== 'undefined' && req.query.name !== '') {
      //console.log('ifffff');
      let customerData = await customer.find({
        firstName: { $regex: req.query.name, $options: 'i' },
      });
      //console.log(customerData);
      // TODO limit customers
      if (customerData) {
        return res.json({
          error: null,
          data: customerData,
        });
      } else {
        return res.status(400).json({
          error: 'Customer not exist with mobile number',
        });
      }
    }
    if (typeof req.query.mobile !== 'undefined' && req.query.mobile !== '') {
      let customerData = await customer.find({
        mobileNumber: { $regex: req.query.mobile, $options: 'i' },
      });
      // TODO limit customers
      if (customerData) {
        return res.json({
          error: null,
          data: customerData,
        });
      } else {
        return res.status(400).json({
          error: 'Customer not exist with mobile number',
        });
      }
    }
    if (typeof req.query.id !== 'undefined' && req.query.id !== '') {
      // get customer details & address
      let customerData = await customer.findById(req.query.id);
      if (customerData) {
        return res.json({
          error: null,
          data: customerData,
        });
      } else {
        return res.status(400).json({
          error: 'Customer not exist',
        });
      }
    }
    return res.status(400).json({
      error: 'Something went wrong. Please try again - get customer & address',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Not authorized to access !',
      });
    }
    req.body.updatedBy = req.user._id;
    req.body.updatedType = req.user.userType; // staff, customer
    const { mobileNumber, email, referarCode } = req.body;
    // if referarCode is not empty check if customer exists or not
    if (referarCode && referarCode != '') {
      let referarCustomer = await customer.findOne({ referarCode });
      if (referarCustomer) {
        req.body.referarId = referarCustomer._id;
        req.body.referarCode = referarCode;
      } else {
        return res.status(400).json({
          error: 'Referrar Customer not exist',
        });
      }
    }
    let updateCustomer = await customer.findByIdAndUpdate(
      { _id: req.customerData._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (updateCustomer) {
      res.status(200).json({
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
