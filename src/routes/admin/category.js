const express = require("express");
const router = express.Router();

const { verifyToken } = require("../../middlewares/admin/checkadminauth");

const {
  getCatById,
  insertCat,
  getAllCat,
  getCat,
  updateCat,
} = require("../../controllers/admin/category");

router.param("id", getCatById);

// insert new category
router.post("/", verifyToken, insertCat);

// get all categories
router.get("/", verifyToken, getAllCat);

// get single categories
router.get("/:id", verifyToken, getCat);

// update category
router.put("/:id", verifyToken, updateCat);

// delete category
//router.delete("/:id", deleteCat);

module.exports = router;
