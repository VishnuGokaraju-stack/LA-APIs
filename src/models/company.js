const mongoose = require("mongoose");

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
      type: Number, // 0 - inactive, 1 - active
      min: 0,
      max: 1,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("company", companySchema);
