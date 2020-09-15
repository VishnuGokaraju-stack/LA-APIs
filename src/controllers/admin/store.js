const store = require("../../models/store");

exports.getStoreById = async (req, res, next, id) => {
  try {
    await store.findById(id).exec((error, store) => {
      if (error || !store) {
        return res.status(400).json({
          error: "Store not exist",
        });
      }
      req.storeData = store;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.insertStore = async (req, res) => {
  try {
    const { storeName, latitude, longitude } = req.body;
    // check if same store already exists
    let validateCheck = await store.findOne({ storeName });
    if (validateCheck) {
      return res.status(400).json({
        error: "Store already exists",
      });
    }
    const geoLocation = { type: "Point", coordinates: [longitude, latitude] };
    // insert into store table
    const newstore = new store({
      storeName: req.body.storeName,
      storeCode: req.body.storeCode,
      companyId: req.body.companyId,
      cityId: req.body.cityId,
      storeAddress: req.body.storeAddress,
      storePincode: req.body.storePincode,
      storeLocation: geoLocation,
      storeMobile: req.body.storeMobile,
      storeMobileAlternate: req.body.storeMobileAlternate,
      isFranchise: req.body.isFranchise,
      royalityPercentage: req.body.royalityPercentage,
      storeOwnerName: req.body.storeOwnerName,
      storeOwnerMobile: req.body.storeOwnerMobile,
      storeOwnerEmail: req.body.storeOwnerEmail,
      storeOwnerProofType: req.body.storeOwnerProofType,
      storeOwnerProofNo: req.body.storeOwnerProofNo,
      storeOwnerBankAccount: req.body.storeOwnerBankAccount,
      storeOwnerBankAccountNo: req.body.storeOwnerBankAccountNo,
    });
    newstore.save((error, store) => {
      if (error) {
        return res.status(400).json({
          error: "Not able to insert user in DB - store",
        });
      }
      res.json({
        error: null,
        data: {
          message: "Store added successfully",
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    await store.find().exec((error, store) => {
      if (error || !store) {
        return res.status(400).json({
          error: "Stores not found",
        });
      }
      res.json({
        error: null,
        data: {
          store,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getStore = async (req, res) => {
  try {
    return res.json({
      error: null,
      data: req.storeData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateStore = async (req, res) => {
  try {
    if (req.body.latitude && req.body.longitude) {
      const { latitude, longitude } = req.body;
      const geoLocation = { type: "Point", coordinates: [longitude, latitude] };
      req.body.storeLocation = geoLocation;
      delete req.body.latitude;
      delete req.body.longitude;
    }

    let updateStore = await store.findByIdAndUpdate(
      { _id: req.storeData._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (updateStore) {
      res.status(201).json({
        error: null,
        data: updateStore,
      });
    } else {
      return res.status(400).json({
        error: "Store not updated. Please try again",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
