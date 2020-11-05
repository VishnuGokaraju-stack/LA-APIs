const express = require('express');
const router = express.Router();

const { verifyToken } = require('../../middlewares/admin/checkadminauth');

const {
  getCompanyById,
  insertCompany,
  getAllCompanies,
  getCompany,
  updateCompany,
} = require('../../controllers/admin/company');

router.param('id', getCompanyById);

// insert new category
router.post('/', insertCompany);

// get all categories
router.get('/', getAllCompanies);

// get single categories
router.get('/:id', getCompany);

// update category
router.put('/:id', updateCompany);

// delete category
//router.delete("/:id", deleteCat);

module.exports = router;
