const membership = require('../models/membership');

exports.insertMembership = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Not authorized to access !',
      });
    }
    // check if item already exists for companyid
    let validateCheck = await membership.find({
      $and: [
        {
          companyId: req.user.companyId,
        },
        {
          planName: req.body.planName,
        },
      ],
    });

    //console.log(validateCheck.length);
    if (validateCheck && validateCheck.length > 0) {
      return res.status(400).json({
        error: 'Membership with same name already exists',
      });
    }
    // insert into item table
    const newPlan = new membership({
      companyId: req.user.companyId,
      planName: req.body.planName,
      planAmount: req.body.planAmount,
      planCreditAmount: req.body.planCreditAmount,
      planDescription: req.body.planDescription,
      planStartDate: req.body.planStartDate,
      planEndDate: req.body.planEndDate,
      createdBy: req.user._id,
      createdType: req.user.userType, // staff, customer
      status: req.body.status,
    });
    newPlan.save((error, item) => {
      if (error) {
        return res.status(400).json({
          error: 'Not able to insert membership in DB',
        });
      }
      res.json({
        error: null,
        data: {
          message: 'Membership plan added successfully',
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateMembership = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Not authorized to access !',
      });
    }
    if (typeof req.query.id === 'undefined' && req.query.id === '') {
      return res.status(400).json({
        error: 'Please enter valid query input',
      });
    }
    req.body.updatedBy = req.user._id;
    req.body.updatedType = req.user.userType; // staff, customer
    let updatemembership = await membership.findByIdAndUpdate(
      { _id: req.query.id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (updatemembership) {
      res.status(200).json({
        error: null,
        data: updatemembership,
      });
    } else {
      return res.status(400).json({
        error: 'Membership plan not updated. Please try again',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getmembership = async (req, res) => {
  try {
    if (typeof req.query.id !== 'undefined' && req.query.id !== '') {
      let membershipData = await membership.findById(req.query.id);
      if (membershipData) {
        return res.json({
          error: null,
          data: membershipData,
        });
      } else {
        return res.status(400).json({
          error: 'Membership plan not exists. Please select another plan',
        });
      }
    }
    let membershipData = await membership.find({
      companyId: req.user.companyId,
    });
    if (membershipData) {
      return res.json({
        error: null,
        data: membershipData,
      });
    } else {
      return res.status(400).json({
        error: 'Membership plans does not exist for company',
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
