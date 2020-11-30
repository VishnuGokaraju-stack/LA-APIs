const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const staffSchema = new mongoose.Schema(
  {
    companyId: {
      type: ObjectId,
      ref: 'company',
      index: true,
    },
    staffFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    staffLastName: {
      type: String,
      trim: true,
    },
    staffEmailId: {
      type: String,
      //required: true,
      trim: true,
    },
    staffMobile: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    staffAlternateMobile: {
      type: String,
      trim: true,
    },
    staffProof: {
      // pancard, aadhar
      type: JSON,
      trim: true,
    },
    staffBankDetails: {
      // SBI, ICICI
      type: JSON,
      trim: true,
    },
    staffEmployeeType: {
      // who can do multiple roles
      // Store Boy, Store Owner, Delivery Boy, Company Owner
      type: Array,
    },
    isEmployeeStoreOwner: {
      type: Boolean,
      trim: true,
      default: false,
    },
    staffStatus: {
      type: String,
      enum: ['Active', 'Inactive', 'Deleted'],
      required: true,
      default: 'Active',
    },
    isCompanyOwner: {
      type: Boolean,
      trim: true,
      default: false,
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
    workdays: {
      type: Array,
    },
    profileImage: {
      type: String,
    },
    inTime: {
      type: Date,
    },
    outTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('staff', staffSchema);
