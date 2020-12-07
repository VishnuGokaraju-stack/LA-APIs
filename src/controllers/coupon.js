const coupon = require('../models/coupon');
const couponMiddleware = require('../middlewares/couponMiddleware');

exports.insertCoupon = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to access !',
      });
    }
    // check same coupon name exists on company level
    const insertValidateData = await couponMiddleware.couponValidation(
      req.body
    );
    if (Object.keys(insertValidateData).length > 0) {
      return res.status(401).json({
        error: insertValidateData.error,
        message: insertValidateData.message,
      });
    }
    console.log('validate: ' + Object.keys(insertValidateData).length);
    return res.status(401).json({
      error: true,
      message: 'Not authorized to access !',
    });
    // check pickupTime - fromtime should be less than toTime

    // check bookingTime - fromDate sould be less than endDate

    // check bookingTime - fromtime sould be less than endtime

    // insert into coupon table
    const newCoupon = new coupon({
      companyId: req.user.companyId,
      pickupTime: req.body.pickupTime,
      bookingTime: req.body.bookingTime,
      geoArea: req.body.geoArea,
      category: req.body.category,
      orderMode: req.body.orderMode,
      serviceType: req.body.serviceType,
      couponName: req.body.couponName,
      couponMeta: req.body.couponMeta,
      couponScheme: req.body.couponScheme,
      applicableClient: req.body.applicableClient,
      createdBy: req.user._id,
      createdType: req.user.userType, // staff, customer
      registeredFrom: req.clientType, // admin, ios, android, msite, website
    });
    let insertCoupon = await newCoupon.save();
    if (insertCoupon) {
      res.status(200).json({
        error: false,
        message: 'Coupon added successfully',
        data: {
          _id: insertCoupon._id,
        },
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Something went wrong. Please try again - coupon',
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
exports.getCoupon = async (req, res) => {
  try {
    if (
      typeof req.query.couponName !== 'undefined' &&
      req.query.couponName !== ''
    ) {
      let couponData = await coupon.find({
        $and: [
          {
            companyId: req.user.companyId,
          },
          {
            firstName: { $regex: req.query.couponName, $options: 'i' },
          },
        ],
      });
      if (couponData) {
        return res.json({
          error: null,
          data: couponData,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: 'Coupons not exist',
        });
      }
    } else if (typeof req.query.id !== 'undefined' && req.query.id !== '') {
      let couponData = await coupon.findById(req.query.id);
      if (couponData) {
        return res.json({
          error: null,
          data: couponData,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: 'Coupon not exist',
        });
      }
    } else {
      let couponData = await coupon.find();
      if (couponData) {
        return res.json({
          error: null,
          data: couponData,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: 'Coupons not exist',
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Not authorized to access !',
      });
    }
    req.body.updatedBy = req.user._id;
    req.body.updatedType = req.user.userType; // staff, customer
    let updateCoupon = await coupon.findByIdAndUpdate(
      { _id: req.query.id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (updateCoupon) {
      res.status(200).json({
        error: null,
        message: 'Coupon updated successfully',
        data: updateCoupon,
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Coupon not updated. Please try again',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
