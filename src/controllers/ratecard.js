const ratecard = require("../models/ratecard");

// exports.getRatecardById = async (req, res, next, id) => {
//     try {
//       await ratecard.findById(id).exec((error, ratecard) => {
//         if (error || !ratecard) {
//           return res.status(400).json({
//             error: 'Ratecard not exist',
//           });
//         }
//         req.ratecardData = ratecard;
//         next();
//       });
//     } catch (error) {
//       return res.status(500).json({
//         error: error.message,
//       });
//     }
//   };
exports.insertRateCard = async (req, res) => {
    try {
      const { rateCardName, companyId } = req.body;
      // check if rateCardName already exists for company
      let ratecardCheck = await ratecard.findOne({
        rateCardName: rateCardName,
        companyId: companyId,
      });
      if (ratecardCheck) {
        return res.status(400).json({
          error: 'Ratecard already exists',
        });
      }
      const newRatecard = new ratecard({
        rateCardOwner: req.body.rateCardOwner, // TODO owner should be dynamic
        rateCardName: req.body.rateCardName,
        companyId: req.body.companyId, // TODO based on login node js should get the companyid
        rateCardServices: req.body.rateCardServices,// JSON
        rateCardStatus: req.body.rateCardStatus,
      });
      let insertRatecard = await newRatecard.save();
      if (insertRatecard) {
        res.status(200).json({
          error: null,
          data: {
            message: 'Ratecard added successfully',
          },
        });
      } else {
        return res.status(400).json({
          error: 'Something went wrong. Please try again - add rate card',
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };


  exports.updateRateCard = async (req, res) => {
    try {
      // const { mobileNumber, email } = req.body;
      // TODO - check if duplicate rateCardName based on companyid exists
    console.log(req.query);
      let updateRateCard = await ratecard.findByIdAndUpdate(
        { _id: req.query.id },
        { $set: req.body },
        { new: true, useFindAndModify: false }
      );
      if (updateRateCard) {
        res.status(200).json({
          error: null,
          data: updateRateCard,
        });
      } else {
        return res.status(400).json({
          error: 'Ratecard not updated. Please try again',
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  

//   exports.getRateCard = async (req, res) => {
//     try {
//       if (typeof req.query === 'undefined') {
//         return res.status(400).json({
//           error:
//             'Please enter a valid input to fetch ratecards. Please check the parameters',
//         });
//       }
//       if (typeof req.query.name !== 'undefined' && req.query.name !== '') {
//         let staffData = await storestaff.find({
//           staffFirstName: { $regex: req.query.name, $options: 'i' },
//         });
//         // TODO limit staff
//         if (staffData) {
//           return res.json({
//             error: null,
//             data: staffData,
//           });
//         } else {
//           return res.status(400).json({
//             error: 'Staff does not exist with mobile number',
//           });
//         }
//       }
//       if (typeof req.query.mobile !== 'undefined' && req.query.mobile !== '') {
//         let staffData = await storestaff.find({
//           staffMobile: { $regex: req.query.mobile, $options: 'i' },
//         });
//         // TODO limit staff
//         if (staffData) {
//           return res.json({
//             error: null,
//             data: staffData,
//           });
//         } else {
//           return res.status(400).json({
//             error: 'Staff does not exist with mobile number',
//           });
//         }
//       }
//       if (typeof req.query.id !== 'undefined' && req.query.id !== '') {
//         // get staff details
//         let staffData = await storestaff.findById(req.query.id);
//         if (staffData) {
//           return res.json({
//             error: null,
//             data: staffData,
//           });
//         } else {
//           return res.status(400).json({
//             error: 'Staff not exist',
//           });
//         }
//       }
//       // if (typeof req.query.store !== 'undefined' && req.query.store !== '') {
//       //   // get staff details
//       //   let staffData = await storestaff.find({ storeId: req.query.store });
//       //   if (staffData) {
//       //     return res.json({
//       //       error: null,
//       //       data: staffData,
//       //     });
//       //   } else {
//       //     return res.status(400).json({
//       //       error: 'Staff not exist',
//       //     });
//       //   }
//       // }
//       return res.status(400).json({
//         error: 'Something went wrong. Please try again - get staff',
//       });
//     } catch (error) {
//       res.status(500).json({
//         error: error.message,
//       });
//     }
//   };