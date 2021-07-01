// users schema
// id                INT, Primary KeyboardEvent, Not null, Unique, Auto Generated
// username          VARCHAR(255), Not null, Unique
// active            INT, default -> 0
// verified          INT, default -> 0
// topic             VARCHAR(255), default -> null
// authors           INT, Unique, default -> null
// email             VARCHAR(255), Unique, Not NULL
// website           VARCHAR(255), default -> null
// originationName   VARCHAR(255), default -> null
// originationLink   VARCHAR(255), default -> null
// password          VARCHAR(255), Not NULL

const sql = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const Auth = function(auth){
    this.username = auth.username;
    this.active = auth.active;
    this.verified = auth.verified;
    this.topic = auth.topic;
    this.authors = auth.authors
    this.email = auth.email;
    this.website = auth.website;
    this.originationName = auth.originationName;
    this.originationLink = auth.originationLink;
    this.password = auth.password;    
};

Auth.create = (user, result) => {
    sql.query("INSERT INTO users SET ?", user, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null)
            return;
        }
        
        user.id = res.insertId
        result(null, (user))
    })
}

Auth.loginUser = (username, password, result) => {
    sql.query(`SELECT id FROM users WHERE username = "${username}" AND password = "${password}"`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null)
            return;
        }
        result(null, JSON.stringify(res))
    })
}

Auth.hashPassword = (password) => {
    const hash = bcrypt.hashSync(password, process.env.SECRET_KEY);
    return hash
}

Auth.signToken = (id) => {
    return jwt.sign({id: id.toString()}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_DATE
    })
};


module.exports = Auth;