/*
Name: Author Model
Author(s): Robert Ciborowski
Date: June 27, 2021
Description: The model which represents an author.

             authors schema:
             id         INT, Primary Key, Not null, Unique, Auto Generated
             name       VARCHAR(255), Not NULL
             area       VARCHAR(255), default -> NULL
             rating     INT, default -> -1
 */

const sql = require("../config/db");
require('dotenv').config();

const Author = function(auth){
    this.name = auth.name;
    this.area = auth.area;
    this.rating = auth.rating;
};

// This inserts a new author into the SQL table.
Author.create = (user, result) => {
    sql.query("INSERT INTO authors SET ?", user, (err, res) => {
        if(err){
            console.log("Authors addAuthor error: ", err);
            result(err, null)
            return;
        }
        user.id = res.insertId
        result(null, user)
    })
}

// This gets author data from the SQL table using an id.
Author.get = (id, result) => {
    sql.query(`SELECT * FROM authors where id = "${id}"`, (err, res) => {
        if(err){
            console.log("Authors getAuthor error: ", err);
            result(err, null)
            return;
        }
        console.log(res)
        result(null, res)
    })
}

// This removes an author from the SQL table using an id.
Author.remove = (id, result) => {
    sql.query(`DELETE FROM authors where id = "${id}"`, (err, res) => {
        if(err){
            console.log("Authors removeAuthor error: ", err);
            result(err, null)
            return;
        }
        result(null, res)
    })
}

Author.updateInfo = (val, result) => {
    const id = parseInt(val.id, 10);
    sql.query(`UPDATE authors SET name = '${val.name}', area = '${val.area}' WHERE id = ${id}`, (err, res) => {
        if(err){
            result(err, null)
            return;
        }
        result(null, res)
    })
}

module.exports = Author;
