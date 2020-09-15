const adminlogin = require("../models/authenticationadmin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// signup
exports.signup = async (req, res) => {
  //TODO check if username already exists
  const isUserExist = await adminlogin.findOne({ username: req.body.username });
  if (isUserExist) {
    return res.status(400).json({
      error: "Username already exists.",
    });
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  //console.log(req.body);
  const adminuser = new adminlogin({
    username: req.body.username,
    password,
  });
  adminuser.save((error, user) => {
    //console.log(error);
    if (error) {
      return res.status(400).json({
        error: "Not able to insert user in DB",
      });
    }
    res.json({
      error: null,
      data: {
        username: user.username,
        logintype: user.logintype,
        //id: user._id,
      },
    });
  });
};

// signin
exports.signin = async (req, res) => {
  const { username, password } = req.body;
  await adminlogin.findOne({ username }, (error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Please enter valid user name",
      });
    }
    if (!user) {
      return res.status(400).json({
        error: "Please enter valid user name",
      });
    }
    const validatePassword = bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) {
      return res.stats(400).json({
        error: "Username and Password do not match",
      });
    }
    // create token
    const token = jwt.sign(
      { _id: user._id },
      process.env.AUTHENTICATION_SECRET
    );
    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    // send response to front end
    const { logintype, username } = user;
    return res.header("Authorization").json({
      error: null,
      data: {
        token,
        username,
        logintype,
      },
    });
  });
};

// signout
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};
