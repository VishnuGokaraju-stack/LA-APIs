const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const storestaffSchema = new mongoose.Schema({
  companyId: {
    type: ObjectId,
    ref: 'company',
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
    required: true,
    trim: true,
  },
  staffMobile: {
    type: String,
    required: true,
    trim: true,
  },
  staffAlternateMobile: {
    type: String,
    trim: true,
  },
  // encryptPassword: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
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
    type: Array,
  },
  staffStatus: {
    type: String,
    enum: ['Active', 'Inactive', 'Deleted'],
    required: true,
    default: 'Active',
  },
});

module.exports = mongoose.model('storestaff', storestaffSchema);
