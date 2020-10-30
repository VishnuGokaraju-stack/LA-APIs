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
  },
  { timestamps: true }
);

module.exports = mongoose.model('company', companySchema);
