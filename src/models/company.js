const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    companyCode: {
      type: String,
      trim: true,
      unique: true,
    },
    companyLogo: {
      type: String,
      trim: true,
    },
    companyOwnerName: {
      type: String,
      trim: true,
    },
    companyOwnerMobile: {
      type: String,
      trim: true,
      unique: [true, 'Mobile number already assigned to another company'],
    },
    companyOwnerMobileAlternate: {
      type: String,
      trim: true,
    },
    companyStatus: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
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
    timeSlots: {
      type: JSON,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('company', companySchema);
