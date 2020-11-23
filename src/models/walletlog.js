const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const walletLogSchema = new mongoose.Schema(
  {
    customerId: {
      type: ObjectId,
      ref: 'customer',
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
      enum: ['credit', 'debit'],
    },
    transactionName: {
      type: String,
      enum: ['cashback', 'promotional', 'cash'],
      default: 'cash',
    },
    walletType: {
      // cash wallet, promotional wallet, referral wallet
      type: String,
      required: true,
      enum: ['cashWallet'],
      default: 'cashWallet',
    },
    walletDescription: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: ObjectId,
      ref: 'staff',
    },
    createdType: {
      type: String,
      enum: ['staff', 'customer'],
    },
    // TODO
    //orderId: {},
    membershipId: {
      type: ObjectId,
      ref: 'membership',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('walletlog', walletLogSchema);
