const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
  {
    companyId: {
      type: ObjectId,
      ref: 'company',
      index: true,
    },
    mcId: {
      type: ObjectId,
      ref: 'motherCategory',
      index: true,
    },
    catName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    catSmallDesc: {
      type: String,
      trim: true,
    },
    catDesc: {
      type: String,
      trim: true,
    },
    catDeliveryCharge: {
      type: Number,
    },
    catDeliveryDuration: {
      type: Number, // in 5 hours / 2-3 days
    },
    catDeliveryDurationText: {
      type: String, // hours / days
    },
    catExpressDeliveryDuration: {
      type: Number, // 1 hour, 2 hours
    },
    catExpressDeliveryDurationText: {
      type: String, // hours , days
    },
    catImage: {
      type: String, // image url
      trim: true,
    },
    catStatus: {
      type: Number, // 0 - inactive, 1 - active
      min: 0,
      max: 1,
      default: 0,
    },
    createdBy: {
      type: ObjectId,
      ref: 'staff',
    },
    updatedBy: {
      type: ObjectId,
      ref: 'staff',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('category', categorySchema);
