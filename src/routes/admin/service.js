const express = require('express');
const router = express.Router();

const { verifyToken } = require('../../middlewares/admin/checkadminauth');
const {
  getServiceById,
  insertService,
  getAllService,
  getService,
  updateService,
} = require('../../controllers/admin/service');

router.param('id', getServiceById);

// insert new service
router.post('/', insertService);

// get all services
router.get('/', getAllService);

// get single service
router.get('/:id', getService);

// update service
router.put('/:id', updateService);

// delete service
//router.delete("/:id", deleteService);

module.exports = router;
