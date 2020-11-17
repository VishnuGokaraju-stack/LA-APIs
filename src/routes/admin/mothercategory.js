const express = require('express');
const router = express.Router();
const {
  validateInsertMC,
  MCValidationResult,
} = require('../../validations/mothercategory');
const { verifyToken } = require('../../middlewares/admin/checkadminauth');
const {
  insertMC,
  getAllMC,
  getMCById,
  getMC,
  updateMC,
} = require('../../controllers/admin/mothercategory');

router.param('id', getMCById);

// insert new mothercategory
router.post('/', verifyToken, validateInsertMC, MCValidationResult, insertMC);

// get all mothercategories
router.get('/', verifyToken, getAllMC);

// get single mothercategories
router.get('/:id', verifyToken, getMC);

// update mothercategory
router.put('/:id', verifyToken, updateMC);

// delete mothercategory
//router.delete("/:id", deleteMC);

module.exports = router;
