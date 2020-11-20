// const membership = require('../models/membership');

// exports.insertMembership = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({
//         error: 'Not authorized to access !',
//       });
//     }
//     // check if item already exists for companyid
//     let validateCheck = await membership.find({ companyId: req.user.companyId });
//     //console.log(validateCheck);

//     //console.log(validateCheck.length);
//     if (validateCheck && validateCheck.length > 0) {
//       return res.status(400).json({
//         error: 'Item for the company already exists',
//       });
//     }
//     // insert into item table
//     const newItem = new item({
//       itemList: req.body.itemList,
//       companyId: req.user.companyId,
//       createdBy: req.user._id,
//     });
//     //console.log(newCat);
//     newItem.save((error, item) => {
//       if (error) {
//         return res.status(400).json({
//           error: 'Not able to insert user in DB - item list',
//         });
//       }
//       res.json({
//         error: null,
//         data: {
//           message: 'Items added successfully',
//         },
//       });
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };
