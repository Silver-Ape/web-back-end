const express = require("express");
const {createUser, loginUser, testing} = require('../controllers/auth.controller')
const { protect } = require('../middleware/auth')

const router = express.Router();


router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/tester', protect ,testing)

module.exports = router;