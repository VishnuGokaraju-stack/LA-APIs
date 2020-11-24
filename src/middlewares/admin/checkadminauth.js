const jwt = require('jsonwebtoken');
const staff = require('../../models/staff');

// middleware to validate token
exports.verifyToken = async (req, res, next) => {
  try {
    //TODO
    // check cookie exists

    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.AUTHENTICATION_SECRET);
    if (!token) {
      return res.status(401).json({
        error: 'Access denied !',
      });
    }
    try {
      const user = await staff.findOne({
        _id: data._id,
        //"tokens.token": token,
      });
      //console.log("user : "+user);
      if (!user) {
        return res.status(401).json({
          error: 'Not authorized to access !',
        });
      }
      user.password = 0;
      req.user = user;
      req.userType = 'staff'; // staff, customer
      req.token = token;
      next(); // to continue the flow
    } catch (error) {
      res.status(401).json({
        error: 'Not authorized to access !',
      });
    }
  } catch (error) {
    res.status(401).json({
      error: 'Not authorized to access !',
    });
  }
};

//module.exports = verifyToken;
