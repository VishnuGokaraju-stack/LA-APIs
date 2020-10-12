const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const ratecardSchema = new mongoose.Schema({
  rateCardName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  rateCardServices: {
    type: JSON,
    required: true,
    trim: true,
  },
  rateCardType: {
    type: String,
    enum: ['Offline', 'Online'],
    required: true,
  },
  companyId: { // TODO ObjectId to replace with String
    //type: String
    type: ObjectId,
    ref: 'company',
    required: true,
  },
  storeId: {
    type: ObjectId,
    ref: "store"
  },
  rateCardStatus: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true,
    default: 'Active',
  }
});

module.exports = mongoose.model('ratecard', ratecardSchema);
