const express = require("express");
const {addAuthor, removeAuthor, modifyAuthor, getAuthor} = require('../controllers/author.controller')

const router = express.Router();


router.post('/create', addAuthor);
router.post('/remove', removeAuthor);
router.get('/get', getAuthor);

module.exports = router;