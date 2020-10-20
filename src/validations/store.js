const { check, validationResult } = require("express-validator");

exports.storeValidationResult = async (req, res, next) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};

exports.validateInsertStore = [
  check("storeName")
    .not()
    .isEmpty()
    .withMessage("Please enter a valid store name"),
  check("storeMobile")
    .not()
    .isEmpty()
    .withMessage("Please enter store mobile number"),
];
