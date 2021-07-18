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
// name              VARCHAR(255), default -> null

const sql = require("../config/db");


const User = function(auth){
    this.id = auth.id;
    this.username = auth.username;
    this.active = auth.active;
    this.verified = auth.verified;
    this.topic = auth.topic;
    this.authors = auth.authors
    this.email = auth.email;
    this.website = auth.website;
    this.originationName = auth.originationName;
    this.originationLink = auth.originationLink;
    this.name = auth.name;
};

User.findUserById = (id, result) => {
    sql.query(`SELECT id,username,active,verified,topic,authors,email,website,originationName,originationLink,name FROM users WHERE id = ${id} `, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null)
            return;
        }
        result(null, JSON.stringify(res))
    })
}

User.findUserByUsername = (username, result) => {
    sql.query(`SELECT id,username,active,verified,topic,authors,email,website,originationName,originationLink,name FROM users WHERE username = '${username}' `, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null)
            return;
        }
        result(null, res)
    })
}


User.registerAnthor = (userId, authorId, result) => {
    userId = parseInt(userId, 10);
    authorId = parseInt(authorId, 10);
    sql.query(`UPDATE users SET authors = ${authorId} WHERE id = ${userId} `, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null)
            return;
        }
        result(null, res)
    })
}


User.updateUserInfo = (userId, info, result) => {
    userId = parseInt(userId, 10);
    sql.query(`UPDATE users SET name = '${info.name}', originationLink = '${info.originationLink}', originationName = '${info.originationName}',  website = '${info.website}', topic = '${info.topic}' WHERE id = ${userId}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null)
            return;
        }
        result(null, res)
    })
}

User.activeUser = (userId, result) => {
    userId = parseInt(userId, 10);
    sql.query(`UPDATE users SET active = 1 WHERE id = ${userId}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null)
            return;
        }
        result(null, res)
    })
}

User.removeUser = (userId, result) => {
    userId = parseInt(userId, 10);
    sql.query(`DELETE FROM users WHERE id = ${userId}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null)
            return;
        }
        result(null, res)
    })
}

User.unregisterAuthor = (userId, result) => {
    userId = parseInt(userId, 10);
    sql.query(`UPDATE users SET authors = NULL WHERE id = ${userId} `, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null)
            return;
        }
        result(null, res)
    })
}

module.exports = User;
