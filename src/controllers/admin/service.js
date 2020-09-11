const service = require("../../models/service");

exports.getServiceById = async (req, res, next, id) => {
  try {
    await service.findById(id).exec((error, service) => {
      if (error || !service) {
        return res.status(400).json({
          error: "Something went wrong. Please try again",
        });
      }
      req.serviceData = service;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.insertService = async (req, res) => {
  try {
    const { serviceName } = req.body;
    // check if same serviceName already exists
    let validateCheck = await service.findOne({ serviceName });
    // await service.findOne({ serviceName }, (error, service) => {
    //   if (error) {
    //     return res.status(400).json({
    //       error: "Something went wrong. Please try again",
    //     });
    //   }
    //   if (service) {
    //     return res.status(400).json({
    //       error: "Service already exists",
    //     });
    //   }
    // });
    if (validateCheck) {
      return res.status(400).json({
        error: "Service already exists",
      });
    }
    // insert into service table
    const newService = new service({
      serviceName: req.body.serviceName,
      mcId: req.body.mcId,
      catId: req.body.catId,
      subcatId: req.body.subcatId,
      perUnitPrice: req.body.perUnitPrice,
      minValue: req.body.minValue,
      minValueText: req.body.minValueText,
      minPrice: req.body.minPrice,
      additionalPrice: req.body.additionalPrice,
    });
    newService.save((error, service) => {
      if (error) {
        return res.status(400).json({
          error: "Not able to insert user in DB - service",
        });
      }
      res.status(201).json({
        error: null,
        data: {
          message: "Service added successfully",
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllService = async (req, res) => {
  try {
    await service.find().exec((error, service) => {
      if (error || !service) {
        return res.status(400).json({
          error: "Services not found",
        });
      }
      res.status(201).json({
        error: null,
        data: {
          service,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getService = async (req, res) => {
  try {
    return res.json({
      error: null,
      data: req.serviceData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    let updateService = await service.findByIdAndUpdate(
      { _id: req.serviceData._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
      // (error, service) => {
      //   if (error) {
      //     return res.status(400).json({
      //       error: "Service not updated. Please try again",
      //     });
      //   }
      //   res.json({
      //     error: null,
      //     data: service,
      //   });
      // }
    );
    if (updateService) {
      res.status(201).json({
        error: null,
        data: updateService,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
