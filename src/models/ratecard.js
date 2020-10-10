const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const ratecardSchema = new mongoose.Schema({
  rateCardOwner: { // owner id  who created the rate card
    type: String, // TODO convert to ObjectId
    required: true
  },
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
  companyId: { // TODO ObjectId to replace with String
    type: String
    // type: ObjectId,
    // ref: 'company',
    // required: true,
  },
  rateCardStatus: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true,
    default: 'Active',
  }
});

module.exports = mongoose.model('ratecard', ratecardSchema);
