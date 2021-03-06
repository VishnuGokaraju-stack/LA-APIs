const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const ratecardSchema = new mongoose.Schema(
  {
    rateCardName: {
      type: String,
      required: true,
      trim: true,
    },
    // isDefault: {
    //   type: Boolean,
    //   default: false
    // },
    rateCardServices: {
      type: JSON,
      required: true,
      trim: true,
    },
    // rateCardType: {
    //   type: String,
    //   enum: ['Offline', 'Online', 'Others', ''],
    //   required: true,
    // },
    companyId: {
      type: ObjectId,
      ref: 'company',
      required: true,
      index: true,
    },
    // storeId: {
    //   type: ObjectId,
    //   ref: 'store',
    //   default: null,
    // },
    rateCardStatus: {
      type: String,
      enum: ['Active', 'Inactive'],
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('ratecard', ratecardSchema);
