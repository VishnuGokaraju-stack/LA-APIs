var express = require('express');
var router = express.Router();
// const {
//   validateSignin,
//   validateSignup,
//   dataValidationResult,
// } = require("../validations/authenticationadmin");
const {
  //signup,
  signin,
  signout,
} = require('../controllers/authenticationadmin');

// signup route
//router.post("/signup", signup);

// signin route
// router.post(
//   "/signin",
//   [
//     check("username")
//       .not()
//       .isEmpty()
//       .isLength({ min: 10 })
//       .withMessage("Please enter a valid user name"),
//     check("password")
//       .isLength({ min: 5 })
//       .withMessage("Please enter a valid password"),
//   ],
//   signin
// );
router.post('/signin', signin);

// signout route
router.get('/signout', signout);

module.exports = router;
