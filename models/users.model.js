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
};

User.findUserById = (id, result) => {
    sql.query(`SELECT id,username,active,verified,topic,authors,email,website,originationName,originationLink FROM users WHERE id = ${id} `, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null)
            return;
        }
        result(null, JSON.stringify(res))
    })
}

module.exports = User;