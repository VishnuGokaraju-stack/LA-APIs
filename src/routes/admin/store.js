const express = require('express');
const router = express.Router();

const { verifyToken } = require('../../middlewares/admin/checkadminauth');
const {
  validateInsertStore,
  storeValidationResult,
} = require('../../validations/store');

const {
  getStoreById,
  insertStore,
  getAllStores,
  getStore,
  updateStore,
} = require('../../controllers/admin/store');

router.param('id', getStoreById);

// insert new category
router.post(
  '/',
  verifyToken,
  validateInsertStore,
  storeValidationResult,
  insertStore
);

// get all categories
router.get('/', verifyToken, getAllStores);

// get single categories
router.get('/:id', verifyToken, getStore);

// update category
router.put('/', verifyToken, updateStore);

// delete category
//router.delete("/:id", deleteCat);

module.exports = router;
