const express = require("express");
const {getUserByUsername ,updateUserInfo, activeUser, deleteUser} = require("../controllers/users.controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get('/:username', getUserByUsername)
router.put('/update/:username', protect, updateUserInfo)
router.put('/active/:username', protect, activeUser)
router.delete('/removeuser/:username', protect, deleteUser)

module.exports = router;
