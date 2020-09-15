const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    cityCode: {
      type: String,
      trim: true,
    },
    cityStatus: {
      type: Number, // 0 - inactive, 1 - active
      min: 0,
      max: 1,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("city", citySchema);
