// env files
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

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

// admin routes
const adminAuthenticationRoutes = require("./src/routes/authenticationadmin");
const mothercategoryRoutes = require("./src/routes/admin/mothercategory");
const categoryRoutes = require("./src/routes/admin/category");
const subcategoryRoutes = require("./src/routes/admin/subcategory");
const serviceRoutes = require("./src/routes/admin/service");
app.use("/admin", adminAuthenticationRoutes);
app.use("/admin/mc", mothercategoryRoutes);
app.use("/admin/cat", categoryRoutes);
app.use("/admin/subcat", subcategoryRoutes);
app.use("/admin/service", serviceRoutes);
// admin + api routes

// api Routes

// Port
const port = process.env.PORT || 1338;
// starting server
app.listen(port, () => {
  console.log(`Listening to port http://localhost:${port}`);
});
