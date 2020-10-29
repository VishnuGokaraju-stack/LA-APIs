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
        rateCardName: req.body.rateCardName,
        companyId: req.body.companyId, // TODO based on login node js should get the companyid
        rateCardServices: req.body.rateCardServices,// JSON
        storeId: req.body.storeId,
        rateCardType: req.body.rateCardType, // Online , Offline, Others, empty
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
      // TODO - check if duplicate rateCardName based on companyid exists
      // if(req.body.rateCardName) {
      //   const { rateCardName, companyId } = req.body;
      //   // check if rateCardName already exists for company
      //   let ratecardCheck = await ratecard.findOne({
      //     rateCardName: rateCardName,
      //     companyId: companyId,
      //   });
      //   if (ratecardCheck) {
      //     return res.status(400).json({
      //       error: 'Ratecard already exists',
      //     });
      //   }
      // }

      // TODO - if ratecard is making inactive, check if ratecard is assigned to a store or not. 
      // Send error message that ratecard is assigned to store

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
  

  exports.getRateCard = async (req, res) => {
    try {
      if (typeof req.query === 'undefined') {
        return res.status(400).json({
          error:
            'Please enter a valid input to fetch ratecards. Please check the parameters',
        });
      }
      if (typeof req.query.id !== 'undefined' && req.query.id !== '') {
        // get staff details
        let companyData = await ratecard.findById(req.query.id);
        if (companyData) {
          return res.json({
            error: null,
            data: companyData,
          });
        } else {
          return res.status(400).json({
            error: 'Ratecard not exist',
          });
        }
      }
      if (typeof req.query.storeId !== 'undefined' && req.query.storeId !== '' && typeof req.query.companyId === 'undefined' && req.query.companyId === '') {
        let storeData = await ratecard.find({
          //storeId: { $regex: req.query.storeId, $options: 'i' },
          storeId: req.query.storeId,
        });
        // TODO limit staff
        if (storeData) {
          return res.json({
            error: null,
            data: storeData,
          });
        } else {
          return res.status(400).json({
            error: 'Ratecards does not exist with store',
          });
        }
      }
      // TODO companyId must be fetched based on login 
      //console.log("aaa "+req.query.companyId);
      if (typeof req.query.companyId !== 'undefined' && req.query.companyId !== '' && typeof req.query.storeId === 'undefined' && req.query.storeId === '') {
        let companyData = await ratecard.find({
          $and:[
            {
              companyId: req.query.companyId,
            },
            {
              storeId: null
            }
          ]
        });
        if (companyData) {
          return res.json({
            error: null,
            data: companyData,
          });
        } else {
          return res.status(400).json({
            error: 'Ratecards does not exist with company',
          });
        }
      }
      if (typeof req.query.storeId !== 'undefined' && req.query.storeId !== '' && typeof req.query.companyId !== 'undefined' && req.query.companyId !== '') {
       let storeData = await ratecard.find({
          $and:[
            {
              companyId: req.query.companyId,
            },
            {
              storeId: req.query.storeId
            }
          ]
        });
        // TODO limit staff
        if (storeData) {
          return res.json({
            error: null,
            data: storeData,
          });
        } else {
          return res.status(400).json({
            error: 'Ratecards does not exist with store and company',
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };