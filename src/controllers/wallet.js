const customer = require('../models/customer');
const walletlog = require('../models/walletlog');
const commonValidation = require('../middlewares/commonvalidation');

exports.updateWallet = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Not authorized to access !',
      });
    }
    if (typeof req.query.id === 'undefined' && req.query.id === '') {
      return res.status(500).json({
        error: 'Please enter a valid input',
      });
    }

    const validateObjectId = await commonValidation.isObjectId(req.query.id);
    if (!validateObjectId) {
      return res.status(500).json({
        error: 'Please enter a valid input - isobjectid',
      });
    }
    //console.log('validateObjectId : ' + validateObjectId);
    const { amount, transactionType } = req.body;
    // check if customer exists or not
    let customerData = await customer.findById(req.query.id);
    if (!customerData) {
      return res.status(400).json({
        error: 'Customer not exist',
      });
    }
    // update wallet + or - in customer table
    let cashWallet = customerData.cashWallet;
    let newCashWallet = 0;
    if (transactionType === 'credit') {
      newCashWallet = cashWallet + amount;
    } else {
      if (cashWallet === 0) {
        return res.status(400).json({
          error: 'Cash wallet for the customer is zero',
        });
      }
      if (cashWallet < amount) {
        return res.status(400).json({
          error: 'Cash wallet is less than amount. Please enter correct amount',
        });
      }
      newCashWallet = cashWallet - amount;
    }
    // update cashwallet in customer table
    let updateData = { cashWallet: 500 };
    let updateCustomerWallet = await customer.findByIdAndUpdate(
      { _id: req.query.id },
      { $set: updateData },
      { new: true, useFindAndModify: false }
    );
    //console.log('aaa : ' + updateCustomerWallet);
    if (updateCustomerWallet) {
      // insert wallet log table
      const newWalletLog = new walletlog({
        customerId: req.query.id,
        amount: amount,
        transactionType: req.body.transactionType,
        transactionName: req.body.transactionName,
        walletType: 'cashWallet',
        walletDescription: req.body.walletDescription,
        createdBy: req.user._id,
        createdType: 'staff', // TODO
      });
      if (
        typeof req.body.membershipId !== 'undefined' &&
        req.body.membershipId !== ''
      ) {
        newWalletLog.membershipId = req.body.membershipId;
      }
      let insertWalletLog = await newWalletLog.save();
      if (!insertWalletLog) {
        return res.status(400).json({
          error: 'Something went wrong. Please try again - add rate card',
        });
      }
      let outputData = {
        cashWallet: updateCustomerWallet.cashWallet,
      };
      res.status(200).json({
        error: null,
        data: outputData,
      });
    } else {
      return res.status(400).json({
        error: 'Customer wallet not updated. Please try again',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
