const { check, validationResult } = require("express-validator");

exports.dataValidationResult = async (req, res, next) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};

exports.validateSignin = [
  check("username")
    .not()
    .isEmpty()
    .isLength({ min: 10 })
    .withMessage("Please enter a valid user name"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Please enter a valid password"),
];

exports.validateSignup = [
  check("username")
    .not()
    .isEmpty()
    .isLength({ min: 10 })
    .withMessage("Please enter a valid user name"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Please enter a valid password"),
];
