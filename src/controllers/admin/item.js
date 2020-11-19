const item = require('../../models/item');

exports.insertItem = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Not authorized to access !',
      });
    }
    //console.log(req.user.companyId);
    // check if item already exists for companyid
    let validateCheck = await item.find({ companyId: req.user.companyId });
    //console.log(validateCheck);

    //console.log(validateCheck.length);
    if (validateCheck && validateCheck.length > 0) {
      return res.status(400).json({
        error: 'Item for the company already exists',
      });
    }
    // insert into item table
    const newItem = new item({
      itemList: req.body.itemList,
      companyId: req.user.companyId,
      createdBy: req.user._id,
    });
    //console.log(newCat);
    newItem.save((error, item) => {
      if (error) {
        return res.status(400).json({
          error: 'Not able to insert user in DB - item list',
        });
      }
      res.json({
        error: null,
        data: {
          message: 'Items added successfully',
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getItem = async (req, res) => {
  try {
    let itemData = await item.find({
      companyId: req.user.companyId,
    });
    if (itemData) {
      return res.json({
        error: null,
        data: itemData,
      });
    } else {
      return res.status(400).json({
        error: 'Itemlist does not exist with company',
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.updateItem = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Not authorized to access !',
      });
    }
    // check if item already exists for companyid
    let validateCheck = await item.find({ companyId: req.user.companyId });
    if (!validateCheck) {
      return res.status(400).json({
        error:
          'Item for the company not exists. Please create item list for the company',
      });
    }
    req.body.updatedBy = req.user._id;
    let updateItemList = await item.findOneAndUpdate(
      { companyId: req.user.companyId },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (updateItemList) {
      res.status(200).json({
        error: null,
        data: updateItemList,
      });
    } else {
      return res.status(400).json({
        error: 'Itemlist not updated. Please try again',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
