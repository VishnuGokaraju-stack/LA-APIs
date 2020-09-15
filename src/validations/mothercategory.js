const { check, validationResult } = require("express-validator");

exports.MCValidationResult = async (req, res, next) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};

exports.validateInsertMC = [
  check("mcName")
    .not()
    .isEmpty()
    .withMessage("Please enter a valid mother category"),
];
