const express = require("express");
const {create, getPapers, getPaperById, getPapersWild, updatePaper, deletePaper} = require('../controllers/paper.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.put('/papers/update',protect, updatePaper)
router.delete('/papers/delete',protect, deletePaper)
router.post('/create', protect, create)
router.get('/papers', getPapers)
router.get('/papers/search', getPapersWild)
router.get('/:id', getPaperById)


module.exports = router;
