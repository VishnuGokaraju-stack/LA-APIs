const store = require('../../models/store');

exports.getStoreById = async (req, res, next, id) => {
  try {
    await store.findById(id).exec((error, store) => {
      if (error || !store) {
        return res.status(400).json({
          error: true,
          message: 'Store not exist',
        });
      }
      req.storeData = store;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.insertStore = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to access !',
      });
    }
    const { storeName } = req.body;
    // check if same store already exists
    let validateCheck = await store.findOne({ storeName });
    if (validateCheck) {
      return res.status(400).json({
        error: true,
        message: 'Store already exists',
      });
    }
    // TODO storecode

    // insert into store table
    const newstore = new store({
      storeName: req.body.storeName,
      storeCode: req.body.storeCode,
      companyId: req.user.companyId,
      cityId: req.body.cityId,
      storeAddress: req.body.storeAddress,
      isVirtual: req.body.isVirtual,
      showInStoreLocator: req.body.showInStoreLocator,
      //parentStore : req.body.parentStore,
      //storePincode: req.body.storePincode,
      //storeLocation: geoLocation,
      //storePolygon: storePolygon,
      storeMobile: req.body.storeMobile,
      storeMobileAlternate: req.body.storeMobileAlternate,
      isFranchise: req.body.isFranchise,
      royalityOnlinePercentage: req.body.royalityOnlinePercentage,
      royalityOfflinePercentage: req.body.royalityOfflinePercentage,
      storeOwners: req.body.storeOwners,
      storeDeliveryBoys: req.body.storeDeliveryBoys,
      storeStaffBoys: req.body.storeStaffBoys,
      storeStatus: req.body.storeStatus,
      createdBy: req.user._id,
      createdType: req.user.userType, // staff, customer
    });
    if (req.body.parentStore) {
      newstore.parentStore = req.body.parentStore;
    }
    if (req.body.ratecardOnline) {
      newstore.ratecardOnline = req.body.ratecardOnline;
    }
    if (req.body.ratecardOffline) {
      // check if ratecard others is array or not
      if (!Array.isArray(req.body.ratecardOffline)) {
        return res.status(400).json({
          error: true,
          message: 'Please enter valid offline ratecards',
        });
      }
      newstore.ratecardOffline = req.body.ratecardOffline;
    }
    if (req.body.storeCoordinates) {
      const storePolygon = {
        type: 'Polygon',
        coordinates: req.body.storeCoordinates,
      };
      newstore.storePolygon = storePolygon;
    }
    newstore.save((error, store) => {
      if (error) {
        return res.status(400).json({
          error: true,
          message: error,
        });
      }
      res.json({
        error: false,
        message: 'Store added successfully',
        data: {
          _id: store._id,
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

exports.getAllStores = async (req, res) => {
  try {
    await store.find({ companyId: req.user.companyId }).exec((error, store) => {
      if (error || !store) {
        return res.status(400).json({
          error: true,
          message: 'Stores not found',
        });
      }
      res.json({
        error: false,
        data: {
          store,
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

exports.getStore = async (req, res) => {
  try {
    return res.json({
      error: false,
      data: req.storeData,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.updateStore = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: 'Not authorized to access !',
      });
    }
    req.body.updatedBy = req.user._id;
    req.body.updatedType = req.user.userType; // staff, customer
    if (req.body.storeCoordinates) {
      const { storeCoordinates } = req.body;
      //const geoLocation = { type: 'Point', coordinates: [longitude, latitude] };
      const storePolygon = { type: 'Polygon', coordinates: storeCoordinates };
      //console.log(storePolygon);
      //req.body.storeLocation = geoLocation;
      req.body.storePolygon = storePolygon;
      //delete req.body.latitude;
      //delete req.body.longitude;
      //delete req.body.storeCoordinates;
    }
    if (!req.body.parentStore) {
      delete req.body.parentStore;
    }
    if (!req.body.ratecardOnline) {
      delete req.body.ratecardOnline;
    }
    // if (!req.body.ratecardOffline) {
    //   delete req.body.ratecardOffline;
    // }
    if (req.body.ratecardOffline) {
      // check if ratecard others is array or not
      if (!Array.isArray(req.body.ratecardOffline)) {
        return res.status(400).json({
          error: true,
          message: 'Please enter valid offline ratecards',
        });
      }
    } else {
      delete req.body.ratecardOffline;
    }
    let updateStore = await store.findByIdAndUpdate(
      { _id: req.storeData._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (updateStore) {
      res.status(201).json({
        error: false,
        data: updateStore,
        message: 'Store updated successfully',
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Store not updated. Please try again',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
