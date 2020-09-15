// env files
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();

// middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// connect to database
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// session
// var sess = {
//   key: "user_sid",
//   secret: "sassprod",
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     expires: 600000,
//   },
// };
// if (app.get("env") === "production") {
//   app.set("trust proxy", 1); // trust first proxy
//   sess.cookie.secure = true; // serve secure cookies
// }
// app.use(session(sess));
//session

// admin routes
const adminAuthenticationRoutes = require("./src/routes/authenticationadmin");
const mothercategoryRoutes = require("./src/routes/admin/mothercategory");
const categoryRoutes = require("./src/routes/admin/category");
const subcategoryRoutes = require("./src/routes/admin/subcategory");
const serviceRoutes = require("./src/routes/admin/service");
const companyRoutes = require("./src/routes/admin/company");
const storeRoutes = require("./src/routes/admin/store");
app.use("/admin", adminAuthenticationRoutes);
app.use("/admin/mc", mothercategoryRoutes);
app.use("/admin/cat", categoryRoutes);
app.use("/admin/subcat", subcategoryRoutes);
app.use("/admin/service", serviceRoutes);
app.use("/admin/company", companyRoutes);
app.use("/admin/store", storeRoutes);
// admin + api routes
const cityRoutes = require("./src/routes/city");
app.use("/city", cityRoutes);
// api Routes

// if not routes found show error
// app.use((req, res, next) => {
//   const error = new Error("Not found");
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
