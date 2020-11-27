const customer = require('../models/customer');
const walletlog = require('../models/walletlog');
const membership = require('../models/membership');
const commonValidation = require('../middlewares/commonvalidation');

exports.updateWallet = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to access !',
      });
    }
    if (
      typeof req.query.customerId === 'undefined' &&
      req.query.customerId === ''
    ) {
      return res.status(500).json({
        error: true,
        message: 'Please enter a valid input',
      });
    }

    const validateObjectId = await commonValidation.isObjectId(
      req.query.customerId
    );
    if (!validateObjectId) {
      return res.status(500).json({
        error: true,
        message: 'Please enter a valid input - isobjectid',
      });
    }

    // check if customer exists or not
    let customerData = await customer.findById(req.query.customerId);
    if (!customerData) {
      return res.status(400).json({
        error: true,
        message: 'Customer not exist',
      });
    }
    const { addWalletType } = req.body;
    let transactionType = 'credit';
    let transactionName = '';
    let amountToCredit = 0;
    // if addWalletType ==  membership
    if (addWalletType === 'membership') {
      if (
        typeof req.body.membershipId === 'undefined' &&
        req.body.membershipId === ''
      ) {
        return res.status(500).json({
          error: true,
          message: 'Please select membership to add wallet',
        });
      }
      // get membership data from mebership id
      let membershipData = await membership.findById(req.body.membershipId);
      if (!membershipData) {
        return res.status(400).json({
          error: true,
          message: 'Membership plan not exists. Please select another plan',
        });
      } else {
        amountToCredit = membershipData.planCreditAmount;
        transactionName = 'membership';
      }
    } else if (addWalletType === 'wallet') {
      // if addWalletType ==  money
      amountToCredit = req.body.amount;
      transactionName = 'wallet';
    } else {
      return res.status(500).json({
        error: true,
        message: 'Please enter a valid wallet type',
      });
    }
    if (amountToCredit <= 0) {
      return res.status(500).json({
        error: true,
        message: 'Please enter a valid amount to add',
      });
    }
    // update wallet + or - in customer table
    let cashWallet = customerData.cashWallet;
    let newCashWallet = parseInt(cashWallet) + parseInt(amountToCredit);
    // update cashwallet in customer table
    let updateData = { cashWallet: newCashWallet };
    let updateCustomerWallet = await customer.findByIdAndUpdate(
      { _id: req.query.customerId },
      { $set: updateData },
      { new: true, useFindAndModify: false }
    );
    if (updateCustomerWallet) {
      // insert wallet log table
      const newWalletLog = new walletlog({
        customerId: req.query.customerId,
        amount: amountToCredit,
        beforeTransactionCashWallet: cashWallet,
        afterTransactionCashWallet: newCashWallet,
        transactionType: transactionType,
        transactionName: transactionName,
        walletType: 'cashWallet',
        createdBy: req.user._id,
        createdType: req.user.userType, // staff, customer
        updatedBy: req.user._id,
        updatedType: req.user.userType, // staff, customer
      });
      if (
        typeof req.body.membershipId !== 'undefined' &&
        req.body.membershipId !== ''
      ) {
        newWalletLog.membershipId = req.body.membershipId;
        newWalletLog.membershipPlanAmount = membershipData.planAmount;
      }
      if (
        typeof req.body.walletDescription !== 'undefined' &&
        req.body.walletDescription !== ''
      ) {
        newWalletLog.walletDescription = req.body.walletDescription;
      }
      if (
        typeof req.body.paymentTransaction !== 'undefined' &&
        req.body.paymentTransaction !== ''
      ) {
        newWalletLog.paymentTransaction = req.body.paymentTransaction;
      }
      if (
        typeof req.body.paymentReferenceId !== 'undefined' &&
        req.body.paymentReferenceId !== ''
      ) {
        newWalletLog.paymentReferenceId = req.body.paymentReferenceId;
      }
      let insertWalletLog = await newWalletLog.save();
      if (!insertWalletLog) {
        return res.status(400).json({
          error: true,
          message: 'Something went wrong. Please try again - add rate card',
        });
      }
      let outputData = {
        cashWallet: updateCustomerWallet.cashWallet,
      };
      res.status(200).json({
        error: false,
        message: 'Wallet added successfully',
        data: outputData,
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Customer wallet not updated. Please try again',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
// let addMembership = async (membershipData, customerData, postVal) => {
//   console.log(membershipData);
//   console.log(customerData);
//   console.log('membership function ');

//   let cashWallet = customerData.cashWallet;
//   let newCashWallet = 0;
//   if (transactionType === 'credit') {
//     newCashWallet = cashWallet + membershipData.amount;
//   } else {
//     if (cashWallet === 0) {
//       return {
//         error: true,
//         message: 'Cash wallet for the customer is zero',
//       };
//     }
//     if (cashWallet < membershipData.amount) {
//       return {
//         error: true,
//         message: 'Cash wallet is less than amount. Please enter correct amount',
//       };
//     }
//     newCashWallet = cashWallet - membershipData.amount;
//   }
//   // update cashwallet in customer table
//   let updateData = { cashWallet: newCashWallet };
//   let updateCustomerWallet = await customer.findByIdAndUpdate(
//     { _id: customerData._id },
//     { $set: updateData },
//     { new: true, useFindAndModify: false }
//   );
//   if (updateCustomerWallet) {
//     // insert wallet log table
//     const newWalletLog = new walletlog({
//       customerId: customerData._id,
//       amount: postVal.amount,
//       transactionType: postVal.transactionType,
//       transactionName: postVal.transactionName,
//       walletType: 'cashWallet',
//       walletDescription: postVal.walletDescription,
//       createdBy: req.user._id,
//       createdType: req.user.userType, // staff, customer
//       updatedBy: req.user._id,
//       updatedType: req.user.userType, // staff, customer
//       afterTransactionCashWallet: newCashWallet,
//       beforeTransactionCashWallet: cashWallet,
//     });
//     if (
//       typeof req.body.membershipId !== 'undefined' &&
//       req.body.membershipId !== ''
//     ) {
//       newWalletLog.membershipId = req.body.membershipId;
//     }
//     let insertWalletLog = await newWalletLog.save();
//     if (!insertWalletLog) {
//       return res.status(400).json({
//         error: true,
//         message: 'Something went wrong. Please try again - add rate card',
//       });
//     }
//     let outputData = {
//       cashWallet: updateCustomerWallet.cashWallet,
//     };
//     res.status(200).json({
//       error: false,
//       data: outputData,
//     });
//   } else {
//     return res.status(400).json({
//       error: true,
//       message: 'Customer wallet not updated. Please try again',
//     });
//   }
//   return 'success';
// };
exports.getWallet = async (req, res) => {
  try {
    if (
      typeof req.query.customerId !== 'undefined' &&
      req.query.customerId !== ''
    ) {
      const validateObjectId = await commonValidation.isObjectId(
        req.query.customerId
      );
      if (!validateObjectId) {
        return res.status(500).json({
          error: true,
          message: 'Please enter a valid input - isobjectid',
        });
      }
      let walletLogData = await walletlog.find({
        customerId: req.query.customerId,
      });
      if (walletLogData) {
        return res.json({
          error: false,
          data: walletLogData,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: 'Wallet logs not exists.',
        });
      }
    } else {
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
