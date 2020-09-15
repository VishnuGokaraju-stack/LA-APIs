const express = require("express");
const router = express.Router();
const {
  validateInsertCity,
  cityValidationResult,
} = require("../validations/city");
const { verifyToken } = require("../middlewares/admin/checkadminauth");

const {
  getCityById,
  insertCity,
  getAllCities,
  getCity,
  updateCity,
} = require("../controllers/city");

router.param("id", getCityById);

// insert new city
router.post(
  "/",
  verifyToken,
  validateInsertCity,
  cityValidationResult,
  insertCity
);

// get all cities
router.get("/", verifyToken, getAllCities);

// get single cities
router.get("/:id", verifyToken, getCity);

// update city
router.put("/:id", verifyToken, updateCity);

// delete city
//router.delete("/:id", deleteCat);

module.exports = router;
