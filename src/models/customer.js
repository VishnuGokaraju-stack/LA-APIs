const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    encryptPassword: {
      type: String,
      trim: true,
      // required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],
    },
    dob: {
      type: Date,
      trim: true,
    },
    referralCode: {
      // unique referral code for each customer
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    referarCode: {
      // used some one referral code to register
      type: String,
      trim: true,
    },
    referarId: {
      // customerId of the referrar
      type: ObjectId,
      ref: 'customer',
    },
    cityId: {
      type: ObjectId,
      ref: 'city',
    },
    address: {
      type: JSON,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Deleted'],
      required: true,
      default: 'Active',
    },
    registeredFrom: {
      type: String,
      enum: ['ADMIN', 'IOS', 'ANDROID', 'MSITE', 'WEBSITE'],
    },
    utmSource: {
      type: String,
      trim: true,
    },
    utmMedium: {
      type: String,
      trim: true,
    },
    utmCampaign: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('customer', customerSchema);
