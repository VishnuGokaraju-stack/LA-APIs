const { query } = require('express');
const { exists } = require('../models/company');
const company = require('../models/company');
const store = require('../models/store');

exports.getTimeslot = async (req, res) => {
  try {
    if (typeof req.query.storeId !== 'undefined' && req.query.storeId !== '') {
      if (
        typeof req.query.slotType !== 'undefined' &&
        req.query.slotType !== ''
      ) {
        let timeslotData = await store.find({ _id: req.query.storeId });
        if (timeslotData) {
          if (req.query.slotType === 'masterSlots') {
            return res.json({
              error: null,
              data: { masterSlots: timeslotData[0].masterSlots },
            });
          } else if (req.query.slotType === 'tempSlots') {
            return res.json({
              error: null,
              data: { tempSlots: timeslotData[0].tempSlots },
            });
          } else {
            return res.json({
              error: null,
              data: {
                masterSlots: timeslotData[0].masterSlots,
                tempSlots: timeslotData[0].tempSlots,
              },
            });
          }
        } else {
          return res.status(400).json({
            error: true,
            message: 'Store not exist',
          });
        }
      }
      let timeslotData = await store.find({ _id: req.query.storeId });
      if (timeslotData) {
        return res.json({
          error: null,
          data: {
            masterSlots: timeslotData[0].masterSlots,
            tempSlots: timeslotData[0].tempSlots,
          },
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
    // validation of post data
    // check if timeSlots key exists or not
    if (
      typeof req.body.timeSlots === 'undefined' &&
      req.body.timeSlots === ''
    ) {
      return res.status(401).json({
        error: true,
        message: 'Please enter a valid input ! ',
      });
    }
    console.log('aaaaaa');
    // let errorCheck = false;
    // Object.entries(req.body.timeSlots).forEach(([key, value]) => {
    //   console.log('---------------------');
    //   console.log(value.from + ' : ' + value.to + ' : ' + value.id);
    //   var d = new Date(value.from);
    //   var f = new Date(value.to);
    //   console.log(d.toLocaleTimeString());
    //   console.log(d.toLocaleDateString());
    //   //console.log('ddd : ' + d.toISOString() + ' : ' + f.toISOString());
    //   //let fromTime = new Date(value.from).toLocaleTimeString();
    //   //let toTime = new Date(value.to).toLocaleTimeString();
    //   //console.log(fromTime + ' : ' + toTime);
    //   // if (fromTime.getTime() === toTime.getTime()) {
    //   //   errorCheck = true;
    //   //   return;
    //   // }
    // });
    // console.log('eee check : ' + errorCheck);
    // if (errorCheck) {
    //   return res.status(401).json({
    //     error: true,
    //     message: 'error check',
    //   });
    // }
    // return res.status(401).json({
    //   error: true,
    //   message: 'Hurray',
    // });
    console.log('store : ' + req.query.storeId);
    console.log('slotType : ' + req.query.slotType);
    if (
      typeof req.query.storeId !== 'undefined' &&
      req.query.storeId !== '' &&
      (typeof req.query.slotType === 'undefined' || req.query.slotType === '')
    ) {
      console.log('bbbbbbb');
      return res.status(401).json({
        error: true,
        message: 'Please enter a valid input ! ',
      });
    }
    if (
      typeof req.query.storeId === 'undefined' &&
      req.query.storeId === '' &&
      (typeof req.query.slotType !== 'undefined' || req.query.slotType !== '')
    ) {
      console.log('cccccccc');
      return res.status(401).json({
        error: true,
        message: 'Please enter a valid input ! ',
      });
    }
    console.log('ddddddd');
    if (
      typeof req.query.storeId !== 'undefined' &&
      req.query.storeId !== '' &&
      typeof req.query.slotType !== 'undefined' &&
      req.query.slotType !== ''
    ) {
      console.log('eeeeeeeeeeeeee');
      if (req.query.slotType === 'masterSlots') {
        let updateStore = await store.findOneAndUpdate(
          { _id: req.query.storeId },
          { $set: { masterSlots: req.body.timeSlots } },
          { new: true, useFindAndModify: false }
        );
        if (updateStore) {
          res.status(200).json({
            error: null,
            message: 'Timeslot for the store updated successfully',
            data: { masterSlots: updateStore.masterSlots },
          });
        } else {
          return res.status(400).json({
            error: true,
            message: 'Timeslot not updated. Please try again',
          });
        }
      } else if (req.query.slotType === 'tempSlots') {
        let updateStore = await store.findOneAndUpdate(
          { _id: req.query.storeId },
          { $set: { tempSlots: req.body.timeSlots } },
          { new: true, useFindAndModify: false }
        );
        if (updateStore) {
          res.status(200).json({
            error: null,
            message: 'Timeslot for the store updated successfully',
            data: { tempSlots: updateStore.tempSlots },
          });
        } else {
          return res.status(400).json({
            error: true,
            message: 'Timeslot not updated. Please try again',
          });
        }
      } else {
        return res.status(401).json({
          error: true,
          message: 'Please enter a valid input ! ',
        });
      }
    } else {
      console.log('ifffffffff');
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
