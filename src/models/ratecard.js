const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const ratecardSchema = new mongoose.Schema({
  rateCardName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  rateCard: {
    type: JSON,
    required: true,
    trim: true,
  },
  companyId: {
    type: ObjectId,
    ref: 'company',
    required: true,
  },
  // storeId: {
  //   type: ObjectId,
  //   required: true,
  //   ref: 'store',
  // },
});

module.exports = mongoose.model('ratecard', ratecardSchema);
