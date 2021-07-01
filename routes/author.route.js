const express = require("express");
const {createAuthor, removeAuthor, getAuthor} = require('../controllers/author.controller')

const router = express.Router();


router.post('/create', createAuthor);
router.post('/remove', removeAuthor);
router.get('/get', getAuthor);

module.exports = router;