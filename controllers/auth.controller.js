const Auth = require("../models/auth.model")
const asyncHandler = require("../middleware/async");
const { hashPassword } = require("../models/auth.model");


//@desc    Register user
//@route   POST /api/v1/auth/register
//@access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
    const {username, email, password, topic, website, originationName, originationLink} = req.body;

    if(username == undefined || email == undefined || password == undefined){
        res.status(400).send({
            message: "Required field can not be empty!"
        });
    }

    hashPassword = Auth.hashPassword(password)

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
        password: hashPassword
    })

    // Save user in the database
    Auth.create(newUser,(err,data) => {
        if(err){
            res.status(400).send({
                message:
                  err.message || "Some error occurred while creating the Customer."
              });
        }
        else sendTokenRosponse(data, 200, res);
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
        if(err){
            res.status(400).send({
                message: "Not authorized"
              });
        }
        else sendTokenRosponse(data, 200, res);
    })


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
