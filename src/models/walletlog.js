const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const walletLogSchema = new mongoose.Schema(
  {
    customerId: {
      type: ObjectId,
      ref: 'customer',
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currentCashWallet: {
      // dynamic
      type: Number,
      required: true,
      default: 0,
    },
    transactionType: {
      type: String,
      required: true,
      enum: ['credit', 'debit'],
    },
    transactionName: {
      type: String,
      enum: ['cashback', 'promotional', 'cash', 'referral'],
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
