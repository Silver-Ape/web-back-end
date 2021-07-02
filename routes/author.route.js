const express = require("express");
const {createAuthor, removeAuthor, getAuthor, updateAuthor} = require('../controllers/author.controller')
const { protect } = require("../middleware/auth")
const router = express.Router();

// Create, e.g.
// http://localhost:5000/api/v1/author/create
// JSON body: {
//     "name": "Geoffrey Hinton",
//     "area": "Machine Learning"
// }
// Response: {
//     "name": "Geoffrey Hinton",
//     "area": "Machine Learning",
//     "rating": null,
//     "id": 2
// }
router.post('/create', protect, createAuthor);

// Remove, e.g.
// http://localhost:5000/api/v1/author/remove
// JSON body: {
//     "id": 2
// }
// Response: {
//     "success": true
// }
router.post('/remove', protect, removeAuthor);

// Remove, e.g.
// http://localhost:5000/api/v1/author/get?id=2
// Response: {
//         "id": 2,
//         "name": "Geoffrey Hinton",
//         "area": "Machine Learning",
//         "rating": null
// }
router.get('/get', getAuthor);

router.put('/update', protect, updateAuthor);

module.exports = router;
