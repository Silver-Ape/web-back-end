const Auth = require("../models/auth.model");
const User = require("../models/users.model");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");



//@desc    Register user
//@route   POST /api/v1/auth/register
//@access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
    const {username, email, password, topic, website, originationName, originationLink, name} = req.body;

    if(username == undefined || email == undefined || password == undefined){
        res.status(400).send({
            message: "Required field can not be empty!"
        });
    }

    const hashPassword = Auth.hashPassword(password)

    // Create a new user
    const newUser = new Auth({
        username: username,
        active: 0,
        verified: 0,
        topic: topic == undefined? null: topic,
        authors: null,
        email: email,
        website: website == undefined? null: website,
        originationName: originationName == undefined? null: originationName,
        originationLink: originationLink == undefined? null: originationLink,
        password: hashPassword,
        name: name == undefined? null :name
    })

    // Save user in the database
    Auth.create(newUser,(err,data) => {
        if(err){
            return next(new ErrorResponse(err.message || "Some error occurred while creating the Customer.", 400));
        }
        else sendTokenRosponse(data.id, 200, res);

    })

})


//@desc    Login user
//@route   POST /api/v1/auth/login
//@access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
    const {username, password} = req.body;

    if(username == undefined || password == undefined){
        res.status(400).send({
            message: "Required field can not be empty!"
        });
    }

    const hashPassword = Auth.hashPassword(password)

    Auth.loginUser(username, hashPassword,(err, data) => {
        if(err || JSON.parse(data).length === 0){

            return next(new ErrorResponse('Not authorized', 401));
        }

        else {
            data = JSON.parse(data);
            console.log(data)
            sendTokenRosponse(data[0].id, 200, res);
        }
    })


})


//@desc    Testing route
//@route   GET /api/v1/auth/tester
//@access  Private
exports.testing = asyncHandler(async(req, res, next) => {
    res.status(200).send({message: req.user})

})


const sendTokenRosponse = (user, statusCode ,res) => {
    const token = Auth.signToken(user);

    const options = {}

    if(process.env.NODE_ENV === 'production'){
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
