const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/admin/checkadminauth');

const { getTimeslot, updateTimeslot } = require('../controllers/timeslot');

// get single timeslot
router.get('/', verifyToken, getTimeslot);

// update timeslot
router.put('/', verifyToken, updateTimeslot);

module.exports = router;
