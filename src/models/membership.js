// const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema;

// const membershipSchema = new mongoose.Schema(
//   {
//     planName: {
//       type: String,
//       required: true,
//     },
//     amounttobePaid: {
//       type: Number,
//       required: true,
//     },
//     amounttobeCredited: {
//       type: Number,
//     },
//     description: {
//       type: String,
//     },
//     planStartDate: {},
//     planEndDate: {},
//     createdBy: {
//       type: ObjectId,
//       ref: 'staff',
//     },
//     updatedBy: {
//       type: ObjectId,
//       ref: 'staff',
//     },
//     status: {
//       type: String,
//       enum: ['Active', 'Inactive'],
//       required: true,
//       default: 'Active',
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('membership', membershipSchema);
