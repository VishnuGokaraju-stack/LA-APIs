const company = require('../models/company');
const store = require('../models/store');

exports.getTimeslot = async (req, res) => {
  try {
    let timeslotData = await company.find({ _id: req.user.companyId });
    if (timeslotData) {
      return res.json({
        error: null,
        data: timeslotData,
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
    let updateCompany = await company.findByIdAndUpdate(
      { _id: req.user.companyId },
      { $set: { timeSlots: req.body.timeSlots } },
      { new: true, useFindAndModify: false }
    );
    if (updateCompany) {
      res.status(200).json({
        error: null,
        message: 'Timeslot updated successfully',
        data: updateCompany,
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Timeslot not updated. Please try again',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
