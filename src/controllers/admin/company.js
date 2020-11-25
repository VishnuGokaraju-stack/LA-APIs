const company = require('../../models/company');
const staff = require('../../models/staff');
const bcrypt = require('bcryptjs');

exports.getCompanyById = async (req, res, next, id) => {
  try {
    await company.findById(id).exec((error, company) => {
      if (error || !company) {
        return res.status(400).json({
          error: true,
          message: 'Company not exist',
        });
      }
      req.companyData = company;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.insertCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    // check if same company already exists
    let validateCheck = await company.findOne({ companyName });
    if (validateCheck) {
      return res.status(400).json({
        error: true,
        message: 'Company already exists',
      });
    }
    // insert into company table
    const newCompany = new company({
      companyName: req.body.companyName,
      companyCode: req.body.companyCode,
      companyLogo: req.body.companyLogo,
      companyOwnerName: req.body.companyOwnerName,
      companyOwnerMobile: req.body.companyOwnerMobile,
      companyOwnerMobileAlternate: req.body.companyOwnerMobileAlternate,
      createdBy: req.user._id,
      createdType: req.user.userType, // staff, customer
    });
    let insertCompany = await newCompany.save();
    //console.log(insertCompany);
    if (insertCompany) {
      //console.log('iffff');
      let newCompanyId = insertCompany._id;
      //console.log(newCompanyId);
      // hash the password
      const salt = await bcrypt.genSalt(10);
      const encryptPassword = await bcrypt.hash(
        req.body.companyOwnerMobile,
        salt
      );
      // insert company owner details in staff table
      const newStaff = await new staff({
        companyId: newCompanyId,
        staffFirstName: req.body.companyOwnerName,
        staffLastName: '',
        //staffEmailId: req.body.staffEmailId,
        staffMobile: req.body.companyOwnerMobile,
        staffAlternateMobile: req.body.companyOwnerMobileAlternate,
        password: encryptPassword,
        //staffProof: req.body.staffProof, // JSON
        //staffBankDetails: req.body.staffBankDetails, // JSON
        staffEmployeeType: req.body.staffEmployeeType, //  Array
        staffStatus: req.body.staffStatus,
        isEmployeeStoreOwner: false,
        isCompanyOwner: true,
      });
      let insertStaff = newStaff.save();
      if (insertStaff) {
        res.status(200).json({
          error: false,
          message: 'Company added successfully',
        });
      } else {
        return res.status(400).json({
          error: true,
          message: 'Something went wrong. Please try again - add company owner',
        });
      }
    } else {
      return res.status(400).json({
        error: true,
        message: 'Not able to insert user in DB - company',
      });
    }
    // newCompany.save((error, company) => {
    //   if (error) {
    //     return res.status(400).json({
    //       error: 'Not able to insert user in DB - company',
    //     });
    //   }

    // res.json({
    //   error: null,
    //   data: {
    //     message: 'Company added successfully',
    //   },
    // });
    //});
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    await company.find().exec((error, company) => {
      if (error || !company) {
        return res.status(400).json({
          error: true,
          message: 'Companies not found',
        });
      }
      res.json({
        error: true,
        data: {
          company,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    return res.json({
      error: false,
      data: req.companyData,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    req.body.updatedBy = req.user._id;
    req.body.updatedType = req.user.userType; // staff, customer
    let updateCompany = await company.findByIdAndUpdate(
      { _id: req.companyData._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (updateCompany) {
      res.status(201).json({
        error: false,
        data: updateCompany,
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Company not updated. Please try again',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
