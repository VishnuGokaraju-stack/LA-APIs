const express = require("express");
const router = express.Router();

const { verifyToken } = require("../../middlewares/admin/checkadminauth");

const {
  getStoreById,
  insertStore,
  getAllStores,
  getStore,
  updateStore,
} = require("../../controllers/admin/store");

router.param("id", getStoreById);

// insert new category
router.post("/", verifyToken, insertStore);

// get all categories
router.get("/", verifyToken, getAllStores);

// get single categories
router.get("/:id", verifyToken, getStore);

// update category
router.put("/:id", verifyToken, updateStore);

// delete category
//router.delete("/:id", deleteCat);

module.exports = router;
