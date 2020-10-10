const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// const storePointSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['Point'],
//     required: true,
//   },
//   coordinates: {
//     type: [Number],
//     required: true,
//     index: '2dsphere',
//   },
//   // formatted address
//   // zipcode
//   // landmark
// });
const storePolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon'],
  },
  coordinates: {
    type: [[[Number]]],
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
    companyId: { // fetch from auth token companyId taken from DB
      type: ObjectId,
      ref: 'company',
    },
    cityId: {
      type: ObjectId,
      ref: 'city',
    },
    storeAddress: {
      type: JSON,
      trim: true,
    },
    ratecardOnline: {
      type: String,
    },
    ratecardOffline: {
      type: String,
    },
    isVirtual: {
      type: Boolean,
      default: false
    },
    showInStoreLocator : {
      type: Boolean,
      default: false
    },
    parentStore : {
      type: ObjectId,
      ref: "store"
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
    royalityOnlinePercentage: {
      // royality percentage to be given to owner when others take franchaise from company
      type: Number,
      default: 0,
    },
    royalityOfflinePercentage: {
      // royality percentage to be given to owner when others take franchaise from company
      type: Number,
      default: 0,
    },
    // storeOwnerName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // storeOwnerMobile: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // storeOwnerEmail: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // storeOwnerProofType: {
    //   type: String, // pancard, aadhar
    //   trim: true,
    // },
    // storeOwnerProofNo: {
    //   type: String, // pancard no , aadhar no
    //   trim: true,
    // },
    // storeOwnerBankAccount: {
    //   // sbi, ICICI
    //   type: String,
    //   trim: true,
    // },
    // storeOwnerBankAccountNo: {
    //   // account number
    //   type: String,
    //   trim: true,
    // },
    storeStatus: {
      type: String,
      enum: ['Active', 'Inactive', 'Deleted'],
      required: true,
      default: 'Active',
    },
    storeOwners: {
      type: Array,
      trim: true,
    },
    storeDeliveryBoys: {
      type: Array,
      trim: true,
    },
    storeStaffBoys: {
      type: Array,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('store', storeSchema);
