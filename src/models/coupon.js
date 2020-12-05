const { trim } = require('lodash');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
  {
    companyId: {
      type: ObjectId,
      ref: 'company',
      index: true,
    },
    storeId: {
      type: ObjectId,
      ref: 'store',
      index: true,
    },
    couponName: {
      type: String,
      required: [true, 'Please enter valid coupon name'],
      trim: true,
    },
    couponDescription: {
      type: String,
      trim: true,
    },
    couponImage: {
      type: String,
      trim: true,
    },
    couponCode: {
      type: String,
      required: [true, 'Please enter coupon code'],
      trim: true,
    },
    minOrderValue: {
      // check if this coupon code is applicable for this min order value (coupon applicable amount)
      type: Number,
      default: 0,
    },
    discountType: {
      type: String,
      enum: [
        'amount',
        'percentage',
        'deliverywaiveoff',
        'expresschargewaiveoff',
        'cashback',
      ],
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    maxDiscount: {
      type: Number,
      default: 0,
    },
    maxCountPerUser: {
      // maximum times each user can use the coupon
      type: Number,
      default: 0,
    },
    overallUsageCount: {
      // coupon can not be used more than this limit for all users
      type: Number,
      default: 0,
    },
    serviceType: {
      type: JSON,
    },
    orderMode: {
      type: JSON,
    },
    pickupTime: {
      type: JSON,
    },
    bookingTime: {
      type: JSON,
    },
    geoArea: {
      type: JSON,
    },
    // pickupStartDate: {
    //   type: Date,
    // },
    // pickupEndDate: {
    //   type: Date,
    // },
    // orderCreationStartDate: {
    //   type: Date,
    // },
    // orderCreationEndDate: {
    //   type: Date,
    // },
    // startTime: {
    //   type: String,
    // },
    // endTime: {
    //   type: String,
    // },
    cityId: {
      type: ObjectId,
      ref: 'city',
    },
    couponValidStartDate: {
      type: Date,
    },
    couponValidEndDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      required: true,
      default: 'Active',
    },
    applicableClient: {
      type: String,
      enum: [
        'SAAS-ADMIN',
        'SAAS-ANDROID',
        'SAAS-IOS',
        'SAAS-WEBSITE',
        'SAAS-MSITE',
        'ALL',
      ],
    },
    createdBy: {
      type: ObjectId,
      ref: 'staff',
    },
    createdType: {
      type: String,
      enum: ['staff', 'customer'],
    },
    updatedBy: {
      type: ObjectId,
      ref: 'staff',
    },
    updatedType: {
      type: String,
      enum: ['staff', 'customer'],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('coupon', couponSchema);
