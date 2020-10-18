var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var adminLoginSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 10,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    companyId: {
      type: ObjectId,
      ref: 'company',
    },
    storeId: {
      type: ObjectId,
      ref: 'store',
    },
    isCompanyOwner: {
      type: Boolean,
      default: false
    },
    // logintype: {
    //   type: String,
    //   maxlength: 20,
    // },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Deleted'],
      required: true,
      default: 'Active',
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("adminlogin", adminLoginSchema);
