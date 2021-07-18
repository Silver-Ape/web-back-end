const User = require("../models/users.model");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");


// @desc    Update user info by username
// @route   PUT /api/v1/user/update/:username
// @access  Private
exports.updateUserInfo = asyncHandler(async (req, res, next) => {

    const {topic, website, originationName, originationLink, name} = req.body

    if(req.user.username !== req.params.username){
        return next(new ErrorResponse('Not authorized', 400));
    }

    const updateInfo = {
        name: name == undefined? null: name,
        originationName: originationName == undefined? null: originationName,
        originationLink: originationLink == undefined? null: originationLink,
        website: website == undefined? null: website,
        topic: topic == undefined? null: topic,
    }

    User.updateUserInfo(req.user.id, updateInfo, (err, data) => {
        if(err){
            return next(new ErrorResponse(err.message || "Some error occured while createing paper", 500));
        }
        res.status(200).send({"data": data})
    })

    // res.status(200).send({"data": updateInfo})
})

// @desc    Active user
// @route   PUT /api/v1/user/active/:username
// @access  Private
exports.activeUser = asyncHandler(async (req, res, next) => {

    if(req.user.username !== req.params.username){
        return next(new ErrorResponse('Not authorized', 400));
    }

    User.activeUser(req.user.id,(err, data) => {
        if(err){
            return next(new ErrorResponse(err.message || "Some error occured while createing paper", 500));
        }
        res.status(200).send({"data": data})
    })

})

// @desc    Delete user by username
// @route   PUT /api/v1/user/removeuser/:username
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {

    if(req.user.username !== req.params.username){
        return next(new ErrorResponse('Not authorized', 400));
    }

    User.removeUser(req.user.id,(err, data) => {
        if(err){
            return next(new ErrorResponse(err.message || "Some error occured while createing paper", 500));
        }
        res.status(200).send({"data": data})
    })

})


//@desc    Get user by username
//@route   GET /api/v1/user/:username
//@access  Public
exports.getUserByUsername = asyncHandler(async (req, res, next) => {
    User.findUserByUsername(req.params.username, (err, data) => {
        if(err){
            return next(new ErrorResponse(err.message || "Some error occured while createing paper", 500));
        }
        res.status(200).send({"data": data})
    })
})
