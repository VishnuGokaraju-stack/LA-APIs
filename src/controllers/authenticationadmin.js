const staff = require('../models/staff');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// signup
// exports.signup = async (req, res) => {
//   //TODO check if username already exists
//   const isUserExist = await staff.findOne({ staffMobile: req.body.username });
//   if (isUserExist) {
//     return res.status(400).json({
//       error: 'Username already exists.',
//     });
//   }

//   // hash the password
//   const salt = await bcrypt.genSalt(10);
//   const password = await bcrypt.hash(req.body.password, salt);
//   //console.log(req.body);
//   const adminuser = new adminlogin({
//     username: req.body.username,
//     password,
//   });
//   adminuser.save((error, user) => {
//     //console.log(error);
//     if (error) {
//       return res.status(400).json({
//         error: 'Not able to insert user in DB',
//       });
//     }
//     res.json({
//       error: null,
//       data: {
//         username: user.username,
//         logintype: user.logintype,
//         //id: user._id,
//       },
//     });
//   });
// };

// signin
exports.signin = async (req, res) => {
  //console.log(req.body);
  const { username, password } = req.body;
  const user = await staff.findOne({ staffMobile: username });
  //console.log(user);
  if (!user) {
    return res.status(400).json({
      error: 'Username not exists',
    });
  }
  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword) {
    return res.stats(400).json({
      error: 'Username and Password do not match',
    });
  }
  // create token
  const token = jwt.sign({ _id: user._id }, process.env.AUTHENTICATION_SECRET);
  // put token in cookie
  res.cookie('token', token, { expire: new Date() + 9999 });
  // send response to front end
  const { staffEmailId, staffFirstName, staffLastName } = user;
  return res.header('Authorization').json({
    error: null,
    data: {
      token,
      emailId: staffEmailId,
      firstName: staffFirstName,
      lastName: staffLastName,
    },
  });
  //});
};

// signout
exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'User signout successfully',
  });
};
