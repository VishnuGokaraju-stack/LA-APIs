const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema(
  {
    itemList: {
      type: JSON,
      trim: true,
    },
    companyId: {
      type: ObjectId,
      ref: 'company',
      index: true,
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

module.exports = mongoose.model('item', itemSchema);
