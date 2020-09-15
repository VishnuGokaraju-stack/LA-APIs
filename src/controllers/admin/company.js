const company = require("../../models/company");

exports.getCompanyById = async (req, res, next, id) => {
  try {
    await company.findById(id).exec((error, company) => {
      if (error || !company) {
        return res.status(400).json({
          error: "Company not exist",
        });
      }
      req.companyData = company;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
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
        error: "Company already exists",
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
    });
    newCompany.save((error, company) => {
      if (error) {
        return res.status(400).json({
          error: "Not able to insert user in DB - company",
        });
      }
      res.json({
        error: null,
        data: {
          message: "Company added successfully",
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    await company.find().exec((error, company) => {
      if (error || !company) {
        return res.status(400).json({
          error: "Companies not found",
        });
      }
      res.json({
        error: null,
        data: {
          company,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    return res.json({
      error: null,
      data: req.companyData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    let updateCompany = await company.findByIdAndUpdate(
      { _id: req.companyData._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (updateCompany) {
      res.status(201).json({
        error: null,
        data: updateCompany,
      });
    } else {
      return res.status(400).json({
        error: "Company not updated. Please try again",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
