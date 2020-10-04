const storestaff = require('../models/storestaff');
const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');

exports.insertStoreStaff = async (req, res) => {
  try {
    const { staffMobile, staffEmailId, storeId } = req.body;
    // check if mobile number already exists
    let mobileCheck = await storestaff.findOne({
      staffMobile: staffMobile,
      storeId: storeId,
    });
    if (mobileCheck) {
      return res.status(400).json({
        error: 'Mobile number already exists',
      });
    }
    // check if email already exists
    let emailCheck = await storestaff.findOne({
      staffEmailId: staffEmailId,
      storeId: storeId,
    });
    if (emailCheck) {
      return res.status(400).json({
        error: 'Email already exists',
      });
    }
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const encry_password = await bcrypt.hash(req.body.staffPassword, salt);
    const newStaff = new storestaff({
      storeId: req.body.storeId,
      staffFirstName: req.body.staffFirstName,
      staffLastName: req.body.staffLastName,
      staffEmailId: req.body.staffEmailId,
      staffMobile: req.body.staffMobile,
      staffAlternateMobile: req.body.staffAlternateMobile,
      encryptPassword: encry_password,
      staffProof: req.body.staffProof, // JSON
      staffBankDetails: req.body.staffBankDetails, // JSON
      staffEmployeeType: req.body.staffEmployeeType, //  Array
      staffStatus: req.body.staffStatus,
    });
    let insertStaff = await newStaff.save();
    if (insertStaff) {
      res.status(200).json({
        error: null,
        data: {
          message: 'Staff added successfully',
        },
      });
    } else {
      return res.status(400).json({
        error: 'Something went wrong. Please try again - add staff boy',
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// exports.getAllStoreStaff = async (req, res) => {
//   try {
//     await storestaff.find().exec((error, staff) => {
//       if (error || !staff) {
//         return res.status(400).json({
//           error: 'Staff not found',
//         });
//       }
//       res.json({
//         error: null,
//         data: {
//           staff,
//         },
//       });
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

exports.getStoreStaff = async (req, res) => {
  try {
    if (typeof req.query === 'undefined') {
      return res.status(400).json({
        error:
          'Please enter a valid input to fetch staff. Please check the parameters',
      });
    }
    if (typeof req.query.name !== 'undefined' && req.query.name !== '') {
      let staffData = await storestaff.find({
        staffFirstName: { $regex: req.query.name, $options: 'i' },
      });
      // TODO limit staff
      if (staffData) {
        return res.json({
          error: null,
          data: staffData,
        });
      } else {
        return res.status(400).json({
          error: 'Staff does not exist with mobile number',
        });
      }
    }
    if (typeof req.query.mobile !== 'undefined' && req.query.mobile !== '') {
      let staffData = await storestaff.find({
        staffMobile: { $regex: req.query.mobile, $options: 'i' },
      });
      // TODO limit staff
      if (staffData) {
        return res.json({
          error: null,
          data: staffData,
        });
      } else {
        return res.status(400).json({
          error: 'Staff does not exist with mobile number',
        });
      }
    }
    if (typeof req.query.id !== 'undefined' && req.query.id !== '') {
      // get staff details
      let staffData = await storestaff.findById(req.query.id);
      if (staffData) {
        return res.json({
          error: null,
          data: staffData,
        });
      } else {
        return res.status(400).json({
          error: 'Staff not exist',
        });
      }
    }
    // if (typeof req.query.store !== 'undefined' && req.query.store !== '') {
    //   // get staff details
    //   let staffData = await storestaff.find({ storeId: req.query.store });
    //   if (staffData) {
    //     return res.json({
    //       error: null,
    //       data: staffData,
    //     });
    //   } else {
    //     return res.status(400).json({
    //       error: 'Staff not exist',
    //     });
    //   }
    // }
    return res.status(400).json({
      error: 'Something went wrong. Please try again - get staff',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateStoreStaff = async (req, res) => {
  try {
    // const { mobileNumber, email } = req.body;
    // TODO - check if duplicate mobile exists

    // TODO - check if duplicate email exists

    let updateStaff = await storestaff.findByIdAndUpdate(
      { _id: req.query.id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (updateStaff) {
      res.status(200).json({
        error: null,
        data: updateStaff,
      });
    } else {
      return res.status(400).json({
        error: 'Staff not updated. Please try again',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
