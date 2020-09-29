const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const addressPointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
    index: '2dsphere',
  },
});

const customerAddressSchema = new mongoose.Schema({
  customerId: {
    type: ObjectId,
    ref: 'customer',
  },
  addressLocation: {
    // longitude first , latitude second -  GeoJSON object types
    type: addressPointSchema,
    required: true,
  },
  addressType: {
    type: String,
    enum: ['HOME', 'WORK'],
  },
  addressPincode: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  addressLandmark: {
    type: String,
    trim: true,
  },
  addressStatus: {
    type: String,
    enum: ['Active', 'Inactive', 'Deleted'],
  },
});

module.exports = mongoose.model('customeraddress', customerAddressSchema);
