require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const session = require('express-session');
const app = express();

// middlewares
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// connect to database
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB CONNECTED');
  });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// admin routes
const adminAuthenticationRoutes = require('./src/routes/authenticationadmin');
const mothercategoryRoutes = require('./src/routes/admin/mothercategory');
const categoryRoutes = require('./src/routes/admin/category');
const subcategoryRoutes = require('./src/routes/admin/subcategory');
const serviceRoutes = require('./src/routes/admin/service');
const companyRoutes = require('./src/routes/admin/company');
const storeRoutes = require('./src/routes/admin/store');
const staffTypesRoutes = require('./src/routes/admin/stafftypes');
app.use('/admin', adminAuthenticationRoutes);
app.use('/admin/mc', mothercategoryRoutes);
app.use('/admin/cat', categoryRoutes);
app.use('/admin/subcat', subcategoryRoutes);
app.use('/admin/service', serviceRoutes);
app.use('/admin/company', companyRoutes);
app.use('/admin/store', storeRoutes);
app.use('/admin/stafftypes', staffTypesRoutes);

// admin + api routes
const cityRoutes = require('./src/routes/city');
const storeStaffRoutes = require('./src/routes/storestaff');
const customerSignupRoutes = require('./src/routes/customersignup');
const rateCardRoutes = require('./src/routes/ratecard');
app.use('/admin/customer/signup', customerSignupRoutes);
app.use('/admin/city', cityRoutes);
app.use('/admin/staff', storeStaffRoutes);
app.use('/admin/ratecard', rateCardRoutes);
// api Routes

// if not routes found show error
// app.use((req, res, next) => {
//   const error = new Error('Not found');
//   error.status(404);
//   next(error);
// });
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.json({
//     error: err.error,
//   });
// });

// Port
const port = process.env.PORT || 1338;
// starting server
app.listen(port, () => {
  console.log(`Listening to port http://localhost:${port}`);
});
