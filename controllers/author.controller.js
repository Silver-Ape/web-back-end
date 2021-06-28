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


//@desc    Creates a new author.
//@route   POST /api/v1/author/create
//@access  Public
exports.createAuthor = asyncHandler(async (req, res, next) => {
    const {name, area} = req.body;

    if (name === undefined) {
        res.status(400).send({
            message: "Required field 'name' cannot be empty!"
        });
    }

    // This creates a new author model object.
    const newAuthor = new Author({
        name: name,
        area: area === undefined? null: area,
        rating: null
    })

    // This adds the author into the database.
    Author.create(newAuthor,(err,data) => {
        if (err) {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while creating the author."
            });
        }
        else sendTokenResponse(data, 200, res);
    })
})

//@desc    Gets an author.
//@route   GET /api/v1/author/get
//@access  Public
exports.getAuthor = asyncHandler(async (req, res, next) => {
    // This is a useful function from one of my other projects. It parses
    // a get URI and turns all of the properties within the URI into a nice
    // object.
    var input = queryStringToJSON(url.parse(req.url).query.replace(/%20/g, " "));
    var id = input.id;

    if (id === undefined) {
        res.status(400).send({
            message: "Required field 'id' cannot be empty!"
        });
    }

    // This tries to get the author.
    Authors.get(id,(err, data) => {
        if (err) {
            res.status(400).send({
                message: "Not authorized"
            });
        }
        else sendTokenResponse(data, 200, res);
    })
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
    }

    // This removes the author from the database.
    Author.remove(id,(err,data) => {
        if (err) {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while removing the author."
            });
        }
        else sendTokenResponse(data, 200, res);
    })
})

// Perhaps this should be moved into its own, seperate file? Multiple files define this function.
const sendTokenResponse = (user, statusCode ,res) => {
    const token = Auth.signToken(user);
    const options = {}

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
}