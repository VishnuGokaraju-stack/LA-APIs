const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/admin/checkadminauth");
const {
	getAllStaffTypes,
	insertStaffType,
} = require("../../controllers/admin/stafftypes");

router.get("/", verifyToken, getAllStaffTypes);
router.post("/", verifyToken, insertStaffType);
module.exports = router;
