const motherCategory = require("../../models/mothercategory");

exports.getMCById = async (req, res, next, id) => {
  try {
    await motherCategory.findById(id).exec((error, mc) => {
      if (error || !mc) {
        return res.status(400).json({
          error: "Mothercategory does not exist",
        });
      }
      req.mcData = mc;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.insertMC = async (req, res) => {
  try {
    const { mcName } = req.body;
    // check if same mothercategory already exists
    let duplicateCheck = await motherCategory.findOne({ mcName });
    if (duplicateCheck) {
      return res.status(400).json({
        error: "Mothercategory already exists",
      });
    }
    // await motherCategory.findOne({ mcName }, (error, mc) => {
    //   console.log("mc : " + mc);
    //   console.log("error : " + error);
    //   if (error) {
    //     return res.status(400).json({
    //       error: "Something went wrong. Please try again",
    //     });
    //   }
    //   if (mc) {
    //     return res.status(400).json({
    //       error: "Mothercategory already exists",
    //     });
    //   }
    // });
    // insert into mothercategory table
    const newMC = new motherCategory({
      mcName: req.body.mcName,
      mcSmallDesc: req.body.mcSmallDesc,
      mcDesc: req.body.mcDesc,
      mcMinOrderValue: req.body.mcMinOrderValue,
      mcDeliveryCharge: req.body.mcDeliveryCharge,
      mcDeliveryDuration: req.body.mcDeliveryDuration,
      mcDeliveryDurationText: req.body.mcDeliveryDurationText,
      mcExpressMultiplier: req.body.mcExpressMultiplier,
      mcExpressDeliveryDuration: req.body.mcExpressDeliveryDuration,
      mcExpressDeliveryDurationText: req.body.mcExpressDeliveryDurationText,
      mcImage: req.body.mcImage,
    });
    //console.log(newMC);
    newMC.save((error, mc) => {
      if (error) {
        return res.status(400).json({
          error: "Not able to insert in DB - MC",
        });
      }
      res.status(201).json({
        error: null,
        data: {
          message: "Mothercategory added successfully",
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllMC = async (req, res) => {
  try {
    await motherCategory.find().exec((error, mc) => {
      if (error || !mc) {
        return res.status(400).json({
          error: "Mothercategories not found",
        });
      }
      res.json({
        error: null,
        data: {
          mc,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getMC = async (req, res) => {
  try {
    return res.json({
      error: null,
      data: req.mcData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateMC = async (req, res) => {
  try {
    if (req.body._id) {
      delete req.body._id;
    }
    let updateMC = await motherCategory.findByIdAndUpdate(
      { _id: req.mcData._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
      // (error, mc) => {
      //   if (error) {
      //     return res.status(400).json({
      //       error: "Mothercategory not updated. Please try again",
      //     });
      //   }
      //   res.json({
      //     error: null,
      //     data: mc,
      //   });
      // }
    );
    if (updateMC) {
      res.status(201).json({
        error: null,
        data: updateMC,
      });
    } else {
      return res.status(400).json({
        error: "Mothercategory not updated. Please try again",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// exports.deleteMC = async (req, res) => {
//   try {
//     await motherCategory.findByIdAndUpdate(
//       { _id: req.mcData._id },
//       { $set: req.body },
//       { new: true, useFindAndModify: true },
//       (error, mc) => {
//         if (error) {
//           return res.status(400).json({
//             error: "Mothercategory not updated. Please try again",
//           });
//         }
//         res.json({
//           error: null,
//           data: mc,
//         });
//       }
//     );
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };
