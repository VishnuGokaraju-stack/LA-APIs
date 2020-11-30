const staff = require('../models/staff');
const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');

exports.insertStaff = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to access !',
      });
    }
    const { staffMobile, staffEmailId, storeId } = req.body;
    // check if mobile number already exists
    let mobileCheck = await staff.findOne({
      staffMobile: staffMobile,
      //storeId: storeId,
      // TODO companyId
    });
    if (mobileCheck) {
      return res.status(400).json({
        error: true,
        message: 'Mobile number already exists',
      });
    }
    // check if email already exists
    let emailCheck = await staff.findOne({
      staffEmailId: staffEmailId,
    });
    if (emailCheck) {
      return res.status(400).json({
        error: true,
        message: 'Email already exists',
      });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const encry_password = await bcrypt.hash(req.body.staffPassword, salt);
    const newStaff = new staff({
      companyId: req.user.companyId,
      staffFirstName: req.body.staffFirstName,
      staffLastName: req.body.staffLastName,
      staffEmailId: req.body.staffEmailId,
      staffMobile: req.body.staffMobile,
      staffAlternateMobile: req.body.staffAlternateMobile,
      password: encry_password,
      staffProof: req.body.staffProof, // JSON
      staffBankDetails: req.body.staffBankDetails, // JSON
      staffEmployeeType: req.body.staffEmployeeType, //  Array
      staffStatus: req.body.staffStatus,
      createdBy: req.user._id,
      createdType: req.user.userType, // staff, customer
      workdays: req.body.workdays,
      inTime: req.body.inTime,
      outTime: req.body.outTime,
    });

    // check if staffEmployeeType is empty or not.
    // check if Store owner is there in array or not . If Store owner is true make isEmployeeStoreOwner true
    if (req.body.staffEmployeeType) {
      if (Array.isArray(req.body.staffEmployeeType)) {
        const findStoreOwner = req.body.staffEmployeeType.findIndex(
          (element) => element === 'Store Owner'
        );
        if (findStoreOwner >= 0) {
          newStaff.isEmployeeStoreOwner = true;
        }
      }
    }

    let insertStaff = await newStaff.save();
    if (insertStaff) {
      res.status(200).json({
        error: false,
        message: 'Staff added successfully',
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Something went wrong. Please try again - add staff boy',
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

// exports.getAllStaff = async (req, res) => {
//   try {
//     await staff.find().exec((error, staff) => {
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

exports.getStaff = async (req, res) => {
  try {
    if (typeof req.query === 'undefined') {
      return res.status(400).json({
        error: true,
        message:
          'Please enter a valid input to fetch staff. Please check the parameters',
      });
    }
    if (typeof req.query.name !== 'undefined' && req.query.name !== '') {
      let staffData = await staff.find({
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
          error: true,
          message: 'Staff does not exist with mobile number',
        });
      }
    }
    if (typeof req.query.mobile !== 'undefined' && req.query.mobile !== '') {
      let staffData = await staff.find({
        staffMobile: { $regex: req.query.mobile, $options: 'i' },
      });
      // TODO limit staff
      if (staffData) {
        return res.json({
          error: false,
          data: staffData,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: 'Staff does not exist with mobile number',
        });
      }
    }
    if (typeof req.query.id !== 'undefined' && req.query.id !== '') {
      // get staff details
      let staffData = await staff.findById(req.query.id);
      if (staffData) {
        return res.json({
          error: false,
          data: staffData,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: 'Staff not exist',
        });
      }
    }
    // get all staff under storeownerid
    if (
      typeof req.query.storeOwnerId !== 'undefined' &&
      req.query.storeOwnerId !== ''
    ) {
      // get staff details
      let staffData = await staff.find({ createdBy: req.query.storeOwnerId });
      if (staffData) {
        return res.json({
          error: false,
          data: staffData,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: 'Staff not exist',
        });
      }
    }
    if (typeof req.query.type !== 'undefined' && req.query.type !== '') {
      // get all store owners by company id
      if (req.query.type === 'storeowners') {
        let staffData = await staff.find({
          $and: [
            {
              companyId: req.user.companyId,
            },
            {
              isEmployeeStoreOwner: true,
            },
          ],
        });
        if (staffData) {
          return res.json({
            error: false,
            data: staffData,
          });
        } else {
          return res.status(400).json({
            error: true,
            message: 'Staff not exist',
          });
        }
      }
    }
    let staffData = await staff.find({ companyId: req.user.companyId });
    if (staffData) {
      return res.json({
        error: false,
        data: staffData,
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Staff not exist',
      });
    }

    // if (typeof req.query.store !== 'undefined' && req.query.store !== '') {
    //   // get staff details
    //   let staffData = await staff.find({ storeId: req.query.store });
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
      error: true,
      message: 'Something went wrong. Please try again - get staff',
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to access !',
      });
    }
    req.body.updatedBy = req.user._id;
    req.body.updatedType = req.user.userType; // staff, customer
    // const { mobileNumber, email } = req.body;
    // TODO - check if duplicate mobile exists

    // TODO - check if duplicate email exists

    let updateStaff = await staff.findByIdAndUpdate(
      { _id: req.query.id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (updateStaff) {
      res.status(200).json({
        error: false,
        data: updateStaff,
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Staff not updated. Please try again',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
