const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const storestaffSchema = new mongoose.Schema({
	storeId: {
		type: ObjectId,
		ref: "store",
	},
	staffFirstName: {
		type: String,
		required: true,
		trim: true,
	},
	staffLastName: {
		type: String,
		trim: true,
	},
	staffEmailId: {
		type: String,
		required: true,
		trim: true,
	},
	staffMobile: {
		type: String,
		required: true,
		trim: true,
	},
	staffAlternateMobile: {
		type: String,
		trim: true,
	},
	staffPassword: {
		type: String,
		required: true,
		trim: true,
	},
	staffProofType: {
		type: String, // pancard, aadhar
		trim: true,
	},
	staffProofNo: {
		type: String, // pancard no , aadhar no
		trim: true,
	},
	staffBankAccount: {
		// sbi, ICICI
		type: String,
		trim: true,
	},
	staffBankAccountNo: {
		// account number
		type: String,
		trim: true,
	},
	staffEmployeeType: {
		// store staff, delivery staff, both related to master table
		type: Number,
		required: true,
		ref: "masterstafftype",
	},
	staffStatus: {
		type: Number, // 0 - inactive, 1 - active, 2 - deleted
		min: 0,
		max: 2,
		default: 0,
	},
});

module.exports = mongoose.model("storestaff", storestaffSchema);
