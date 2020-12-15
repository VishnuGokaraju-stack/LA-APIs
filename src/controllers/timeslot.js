const company = require('../models/company');
const store = require('../models/store');

exports.getTimeslot = async (req, res) => {
  try {
    if (typeof req.query.storeId !== 'undefined' && req.query.storeId !== '') {
      let timeslotData = await store.find({ _id: req.query.storeId });
      if (timeslotData) {
        return res.json({
          error: null,
          data: { timeSlots: timeslotData[0].timeSlots },
        });
      } else {
        return res.status(400).json({
          error: true,
          message: 'Store not exist',
        });
      }
    }
    let timeslotData = await company.find({ _id: req.user.companyId });
    if (timeslotData) {
      return res.json({
        error: null,
        data: { timeSlots: timeslotData[0].timeSlots },
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Company not exist',
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.updateTimeslot = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to access !',
      });
    }
    if (typeof req.query.storeId !== 'undefined' && req.query.storeId !== '') {
      let updateStore = await store.findOneAndUpdate(
        { _id: req.query.storeId },
        { $set: { timeSlots: req.body.timeSlots } },
        { new: true, useFindAndModify: false }
      );
      if (updateStore) {
        res.status(200).json({
          error: null,
          message: 'Timeslot for the store updated successfully',
          data: { timeSlots: updateStore.timeSlots },
        });
      } else {
        return res.status(400).json({
          error: true,
          message: 'Timeslot not updated. Please try again',
        });
      }
    } else {
      let updateCompany = await company.findByIdAndUpdate(
        { _id: req.user.companyId },
        { $set: { timeSlots: req.body.timeSlots } },
        { new: true, useFindAndModify: false }
      );
      if (updateCompany) {
        res.status(200).json({
          error: null,
          message: 'Timeslot updated successfully',
          data: { timeSlots: updateCompany.timeSlots },
        });
      } else {
        return res.status(400).json({
          error: true,
          message: 'Timeslot not updated. Please try again',
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
