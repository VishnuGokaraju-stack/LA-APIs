const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middlewares/admin/checkadminauth');

const {
  getSubcatById,
  insertSubcat,
  getAllSubcat,
  getSubcat,
  updateSubcat,
} = require('../../controllers/admin/subcategory');

router.param('id', getSubcatById);

// insert new category
router.post('/', insertSubcat);

// get all categories
router.get('/', getAllSubcat);

// get single categories
router.get('/:id', getSubcat);

// update category
router.put('/:id', updateSubcat);

// delete sub category
//router.delete("/:id", deleteSubcat);

module.exports = router;
