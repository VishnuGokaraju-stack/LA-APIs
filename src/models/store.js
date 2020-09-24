const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const storePointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
    index: '2dsphere',
  },
  // formatted address
  // zipcode
  // landmark
});
const storePolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon'],
  },
  coordinates: {
    type: [[[Number]]],
  },
});
//console.log(storePolygonSchema);
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
      ref: 'company',
    },
    cityId: {
      type: ObjectId,
      ref: 'city',
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
      type: storePointSchema,
      //required: true,
    },
    storePolygon: storePolygonSchema,
    storeMobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    storeMobileAlternate: {
      type: String,
      trim: true,
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
      // sbi, ICICI
      type: String,
      trim: true,
    },
    storeOwnerBankAccountNo: {
      // account number
      type: String,
      trim: true,
    },
    storeStatus: {
      type: Number, // 0 - inactive, 1 - active, 2- deleted
      min: 0,
      max: 2,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('store', storeSchema);
