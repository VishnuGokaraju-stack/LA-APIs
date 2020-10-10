const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subcategorySchema = new mongoose.Schema(
  {
    companyId: {
			type: ObjectId,
			ref: 'company',
		},
    mcId: {
      type: ObjectId,
      ref: "motherCategory",
    },
    catId: {
      type: ObjectId,
      ref: "category",
    },
    subcatName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    subcatSmallDesc: {
      type: String,
      trim: true,
    },
    subcatDesc: {
      type: String,
      trim: true,
    },
    subcatImage: {
      type: String, // image url
      trim: true,
    },
    subcatStatus: {
      type: Number, // 0 - inactive, 1 - active
      min: 0,
      max: 1,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subCategory", subcategorySchema);
