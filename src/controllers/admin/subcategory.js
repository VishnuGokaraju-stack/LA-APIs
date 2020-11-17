const subCategory = require('../../models/subcategory');

exports.getSubcatById = async (req, res, next, id) => {
  try {
    await subCategory.findById(id).exec((error, subcat) => {
      if (error || !subcat) {
        return res.status(400).json({
          error: 'Something went wrong. Please try again',
        });
      }
      req.subcatData = subcat;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.insertSubcat = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Not authorized to access !',
      });
    }
    const { subcatName } = req.body;
    // check if same subcategory already exists
    const duplicateCheck = await subCategory.findOne({ subcatName });
    // await subCategory.findOne({ subcatName }, (error, subcat) => {
    //   if (error) {
    //     return res.status(400).json({
    //       error: "Something went wrong. Please try again",
    //     });
    //   }
    //   if (subcat) {
    //     return res.status(400).json({
    //       error: "Subcategory already exists",
    //     });
    //   }
    // });
    if (duplicateCheck) {
      return res.status(400).json({
        error: 'Subcategory already exists',
      });
    }
    // insert into subcategory table
    const newSubcat = new subCategory({
      subcatName: req.body.subcatName,
      mcId: req.body.mcId,
      subcatId: req.body.subcatId,
      subcatSmallDesc: req.body.subcatSmallDesc,
      subcatDesc: req.body.subcatDesc,
      subcatImage: req.body.subcatImage,
      companyId: req.user.companyId,
      createdBy: req.user._id,
    });
    newSubcat.save((error, subcat) => {
      if (error) {
        return res.status(400).json({
          error: 'Not able to insert user in DB - subcat',
        });
      }
      res.status(201).json({
        error: null,
        data: {
          message: 'Subcategory added successfully',
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllSubcat = async (req, res) => {
  try {
    await subCategory
      .find({ companyId: req.user.companyId })
      .exec((error, subcat) => {
        if (error || !subcat) {
          return res.status(400).json({
            error: 'Subcategories not found',
          });
        }
        res.json({
          error: null,
          data: {
            subcat,
          },
        });
      });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getSubcat = async (req, res) => {
  try {
    return res.json({
      error: null,
      data: req.subcatData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateSubcat = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Not authorized to access !',
      });
    }
    req.body.updatedBy = req.user._id;
    let updateSubCat = await subCategory.findByIdAndUpdate(
      { _id: req.subcatData._id },
      { $set: req.body },
      { new: true, useFindAndModify: true }
      // (error, subcat) => {
      //   if (error) {
      //     return res.status(400).json({
      //       error: "Subcategory not updated. Please try again",
      //     });
      //   }
      //   res.json({
      //     error: null,
      //     data: subcat,
      //   });
      // }
    );
    if (updateSubCat) {
      res.status(201).json({
        error: null,
        data: updateSubCat,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
