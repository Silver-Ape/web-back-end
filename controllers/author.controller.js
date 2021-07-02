/*
Name: Author Controller
Author(s): Robert Ciborowski
Date: June 27, 2021
Description: Handlers which are used by HTTP routes to perform
             tasks related to the authors SQL table. The handlers
             in this file are for GET and POST requests.
*/

const Author = require("../models/author.model");
const User = require("../models/users.model");
const asyncHandler = require("../middleware/async");
const UriUtils = require("../utils/uri")
const ErrorResponse = require("../utils/errorResponse");
const Auth = require("../models/auth.model");


//@desc    Creates a new author.
//@route   POST /api/v1/author/create
//@access  Private
exports.createAuthor = asyncHandler(async (req, res, next) => {
    const {name, area} = req.body;

    if(req.user.authors !== null){
        return next(new ErrorResponse('Already an author', 400));
    }

    if (name === undefined) {
        return next(new ErrorResponse('Please provite all require field', 400));
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
            return next(new ErrorResponse(err.message || "Some error occurred while creating the author.", 400));
        } else {
            User.registerAnthor(req.user.id, data.id, (err,data) => {
                if(err){
                    return next(new ErrorResponse(err.message || "Some error occurred while creating the author.", 400));
                }else{
                    res.status(200).json({"success": true})
                }
            })
        }
    })

    // console.log("Success: /api/v1/author" + req.url)
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
        return next(new ErrorResponse('Please provite all require field', 400));
    }

    // This tries to get the author.
    Author.get(id,(err, data) => {
        if (err) {
            return next(new ErrorResponse("Error getting author with that id.", 400));
        } else {
            if (data.length > 0) data = data[0]
            else data = {}
            res.status(200).send({data: data})
        }
    })

    // console.log("Success: /api/v1/author" + req.url)
})

//@desc    Removes an author.
//@route   POST /api/v1/author/remove
//@access  Private
exports.removeAuthor = asyncHandler(async (req, res, next) => {
    const {id} = req.body;

    if (req.user.authors !== id){
        return next(new ErrorResponse("Not authorized", 401));
    }

    if (id === undefined) {
        return next(new ErrorResponse('Please provite all require field', 400));

    }

    // This removes the author from the database.
    Author.remove(id,(err,data) => {
        if (err) {
            return next(new ErrorResponse(err.message || "Some error occurred while removing the author.", 400));
        } else if (data.affectedRows < 1) {
            res.json({"success": false})
        } else {
            User.unregisterAuthor(req.user.id, (err, data) => {
                if(err){
                    return next(new ErrorResponse(err.message || "Some error occurred while removing the author.", 400));
                }else{
                    res.status(200).json({"success": true})
                }
            })

        }
    })

    // console.log("Success: /api/v1/author" + req.url)
})

// @desc    Update an author.
// @route   PUT /api/v1/author/update
// @access  Private
exports.updateAuthor = asyncHandler(async (req, res, next) => {
    const {id, name, area} = req.body;

    if(req.user.authors !== id){
        return next(new ErrorResponse("Not authorized", 401));
    }

    if(id == undefined || name == undefined || area == undefined){
        return next(new ErrorResponse('Please provite', 400));
    }

    const val = {
        name: name,
        area: area,
        id: id
    }

    Author.updateInfo(val, (err, data) => {
        if(err){
            return next(new ErrorResponse(err.message || "Some error occurred while removing the author.", 400));
        }else{
            res.status(200).json({"success": true})
        }
    })
})
