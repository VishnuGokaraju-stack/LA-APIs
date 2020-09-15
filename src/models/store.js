const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});
const storeSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    storeCode: {
      type: String,
      trim: true,
    },
    companyId: {
      type: ObjectId,
      ref: "company",
    },
    cityId: {
      type: ObjectId,
      ref: "city",
    },
    storeAddress: {
      type: String,
      trim: true,
    },
    storeLandmark: {
      type: String,
      trim: true,
    },
    storePincode: {
      type: String,
      trim: true,
    },
    storeLocation: {
      // longitude first , latitude second -  GeoJSON object types
      type: pointSchema,
      //required: true,
    },
    storeMobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    storeMobileAlternate: {
      type: String,
      trim: true,
      unique: true,
    },
    storePaymentQRcode: {
      type: String,
      trim: true,
    },
    // delivery charges
    // deliver charges min amount
    isFranchise: {
      type: Number,
      default: 0, // 0 - own store, 1 - franchise
    },
    royalityPercentage: {
      // royality percentage to be given to owner when others take franchaise from company
      type: Number,
      default: 0,
    },
    storeOwnerName: {
      type: String,
      required: true,
      trim: true,
    },
    storeOwnerMobile: {
      type: String,
      required: true,
      trim: true,
    },
    storeOwnerEmail: {
      type: String,
      required: true,
      trim: true,
    },
    storeOwnerProofType: {
      type: String, // pancard, aadhar
      trim: true,
    },
    storeOwnerProofNo: {
      type: String, // pancard no , aadhar no
      trim: true,
    },
    storeOwnerBankAccount: {
      type: String,
      trim: true,
    },
    storeOwnerBankAccountNo: {
      type: String,
      trim: true,
    },
    storeStatus: {
      type: Number, // 0 - inactive, 1 - active
      min: 0,
      max: 1,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("store", storeSchema);
