const express = require("express");
const {createAuthor, removeAuthor, getAuthor} = require('../controllers/author.controller')

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
router.post('/create', createAuthor);

// Remove, e.g.
// http://localhost:5000/api/v1/author/remove
// JSON body: {
//     "id": 2
// }
// Response: {
//     "success": true
// }
router.post('/remove', removeAuthor);

// Remove, e.g.
// http://localhost:5000/api/v1/author/get?id=2
// Response: {
//         "id": 2,
//         "name": "Geoffrey Hinton",
//         "area": "Machine Learning",
//         "rating": null
// }
router.get('/get', getAuthor);

module.exports = router;