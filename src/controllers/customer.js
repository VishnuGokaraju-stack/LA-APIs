const customer = require('../models/customer');
const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');
const commonMiddleware = require('../middlewares/commonMiddleware');
const customerMiddleware = require('../middlewares/customerMiddleware');
const mongoose = require('mongoose');

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
    // check if mobile number exists in company or not
    // let customers = await motherCategory.find(
    //   {
    //     companyId: req.user.companyId,
    //   },
    //   { mobileNumber: 1, _id: 0, email: 1 }
    // );
    // if (customers) {
    //   // check mobile number exists or not
    //   const isDuplicateMobile = await customerMiddleware.isDuplicateCheckValidation(
    //     customers,
    //     req.body,
    //     'mobile'
    //   );
    //   if (isDuplicateMobile) {
    //     return res.status(400).json({
    //       error: true,
    //       message: 'Mobile number already exists in the company',
    //     });
    //   }

    //   // check if email exists or not
    //   if (typeof req.body.email !== 'undefined' && req.body.email !== '') {
    //     const isDuplicateEmail = await customerMiddleware.isDuplicateCheckValidation(
    //       customers,
    //       req.body,
    //       'email'
    //     );
    //     if (isDuplicateEmail) {
    //       return res.status(400).json({
    //         error: true,
    //         message: 'Email already exists in the company',
    //       });
    //     }
    //   }
    // }
    //const salt = await bcrypt.genSalt(10);
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
    if (
      typeof req.body.referarCode !== 'undefined' &&
      req.body.referarCode !== ''
    ) {
      let referarCustomer = await customer.findOne({
        referralCode: req.body.referarCode,
      });
      if (referarCustomer) {
        newCustomer.referarId = referarCustomer._id;
        newCustomer.referarCode = req.body.referarCode;
      } else {
        return res.status(400).json({
          error: true,
          message: 'Referrar Customer not exist',
        });
      }
    }
    if (typeof req.body.address !== 'undefined' && req.body.address !== '') {
      newCustomer.address = req.body.address;
    }
    let regFrom = commonMiddleware.clientType(req.user.clientType);
    if (typeof regFrom !== 'undefined') {
      newCustomer.registeredFrom = regFrom;
    }
    let insertCustomer = await newCustomer.save();
    if (insertCustomer) {
      res.status(200).json({
        error: false,
        message: 'Customer added successfully',
        data: {
          _id: insertCustomer._id,
        },
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Something went wrong. Please try again - customer & address',
      });
    }
  } catch (error) {
    // console.log(error);
    // console.log('msg : ' + error.message);
    // console.log('name: ' + error.name);
    // if (error instanceof mongoose.Error.ValidationError) {
    //   console.log('ifffff');
    // }
    res.status(500).json({
      error: true,
      message: error.message,
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
    // check if same mobile already exists
    if (
      typeof req.body.mobileNumber !== 'undefined' &&
      req.body.mobileNumber !== ''
    ) {
      let mobileCheck = await customer.findOne({
        mobileNumber: req.body.mobileNumber,
        _id: { $ne: req.query.id },
      });
      if (mobileCheck) {
        return res.status(400).json({
          error: true,
          message: 'Mobile already exists',
        });
      }
    }
    // check if same email already exists
    if (typeof req.body.email !== 'undefined' && req.body.email !== '') {
      let emailCheck = await customer.findOne({ email: req.body.email });
      if (emailCheck) {
        return res.status(400).json({
          error: true,
          message: 'Email already exists',
        });
      }
    }
    req.body.updatedBy = req.user._id;
    req.body.updatedType = req.user.userType; // staff, customer
    // if referarCode is not empty check if customer exists or not
    if (
      typeof req.body.referarCode !== 'undefined' &&
      req.body.referarCode !== ''
    ) {
      let referarCustomer = await customer.findOne({
        referralCode: req.body.referarCode,
      });
      if (referarCustomer) {
        req.body.referarId = referarCustomer._id;
        req.body.referarCode = req.body.referarCode;
      } else {
        return res.status(400).json({
          error: 'Referrar Customer not exist',
        });
      }
    }
    let updateCustomer = await customer.findByIdAndUpdate(
      { _id: req.query.id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (updateCustomer) {
      res.status(200).json({
        error: null,
        message: 'Customer updated successfully',
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
