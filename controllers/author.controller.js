/*
Name: Author Controller
Author(s): Robert Ciborowski
Date: June 27, 2021
Description: Handlers which are used by HTTP routes to perform
             tasks related to the authors SQL table. The handlers
             in this file are for GET and POST requests.
*/

const Author = require("../models/author.model")
const asyncHandler = require("../middleware/async");
const UriUtils = require("../utils/uri")

//@desc    Creates a new author.
//@route   POST /api/v1/author/create
//@access  Public
exports.createAuthor = asyncHandler(async (req, res, next) => {
    const {name, area} = req.body;

    if (name === undefined) {
        res.status(400).send({
            message: "Required field 'name' cannot be empty!"
        });
        return
    }

    // This creates a new author model object.
    const newAuthor = new Author({
        name: name,
        area: area === undefined? null: area,
        rating: null
    })

    // This adds the author into the database.
    Author.create(newAuthor,(err, data) => {
        if (err) {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while creating the author."
            });
        } else {
            res.json(data)
        }
    })

    console.log("Success: /api/v1/author" + req.url)
})

//@desc    Gets an author.
//@route   GET /api/v1/author/get
//@access  Public
exports.getAuthor = asyncHandler(async (req, res, next) => {
    // We need to parse the URL to extract relevant parameters.
    // First, we get rid of "/get" in the url.
    var urlToParse = req.url.substring(4)
    // Then we extract the parameters.
    var input = UriUtils.parseQuery(urlToParse)
    var id = input.id

    if (id === undefined) {
        res.status(400).send({
            message: "Required field 'id' cannot be empty!"
        });
        return;
    }

    // This tries to get the author.
    Author.get(id,(err, data) => {
        if (err) {
            res.status(400).send({
                message: "Error getting author with that id."
            });
        } else {
            res.json(data)
        }
    })

    console.log("Success: /api/v1/author" + req.url)
})

//@desc    Removes an author.
//@route   POST /api/v1/author/remove
//@access  Public
exports.removeAuthor = asyncHandler(async (req, res, next) => {
    const {id} = req.body;

    if (id === undefined) {
        res.status(400).send({
            message: "Required field 'name' cannot be empty!"
        });
        return
    }

    // This removes the author from the database.
    Author.remove(id,(err,data) => {
        if (err) {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while removing the author."
            });
        } else if (data.affectedRows < 1) {
            res.json({"success": false})
        } else {
            res.json({"success": true})
        }
    })

    console.log("Success: /api/v1/author" + req.url)
})