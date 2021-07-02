const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require("../models/users.model");
require('dotenv').config();


// Protect routes
exports.protect = asyncHandler(async(req, res, next) => {

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }else if(req.cookies.token){
         token = req.cookies.token
    }

    // Make sure token exists
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    token = token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        User.findUserById(Number(decoded.id ), (err,data) => {
            if(err){
                return next(new ErrorResponse('Not authorized to access this route', 401));
            }
            else {
                // console.log(JSON.parse(data)[0])
                req.user =  JSON.parse(data)[0]
            }
            next()
        })

    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }


})
