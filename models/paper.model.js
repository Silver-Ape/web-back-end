// paper schema
// id        INT, Primary Key, Not NULL,Unique, Auto Generated
// name      VARCHAR(255), Not NULL
// date      DATETIME, default -> Not NULL, CURRENT_TIMESTAMP
// author    VARCHAR(255), Not NULL
// abstract  VARCHAR(255), Not NULL
// image     VARCHAR(255), Not NULL
// pdf       VARCHAR(255), Not NULL
// authorIds INT, NOT NULL
// tag       VARCHAR(255)

const sql = require("../config/db");


const Paper = function(paper){
    this.name = paper.name;
    this.author = paper.author;
    this.abstract = paper.abstract;
    this.image = paper.image;
    this.pdf = paper.pdf;
    this.authorIds = paper.authorIds;
    this.tag = paper.tag
    this.topics = paper.topics
}

Paper.create = (paper, result) => {
    sql.query("INSERT INTO paper SET ?", paper, (err, res) => {
        if(err){
            console.log("error", err);
            result(err, null)
            return;
        }

        paper.id = res.insertId
        result(null, paper)
    })
}

Paper.getPapers = (result) => {
    sql.query("SELECT * FROM paper",(err, res) => {
        if(err){
            console.log("error", err);
            result(err, null)
            return;
        }

        result(null, res)
    })
}

Paper.getPaperById = (id,result) => {
    id = parseInt(id, 10);
    sql.query(`SELECT * FROM paper WHERE id = ${id}`,(err, res) => {
        if(err){
            console.log("error", err);
            result(err, null)
            return;
        }

        result(null, res)
    })
}

Paper.weildSeach = (val,result) => {
    sql.query(`SELECT * FROM paper WHERE name LIKE '%${val}%' OR author LIKE '%${val}%' OR topics LIKE '%${val}%' OR abstract LIKE '%${val}%'`, (err, res) => {
        if(err){
            console.log("error", err);
            result(err, null)
            return;
        }

        result(null, res)
    })
}


Paper.updatePaper = (fields, id, result) => {
    id = parseInt(id, 10);
    sql.query(`UPDATE paper SET name = '${fields.name}',  author = '${fields.author}',  abstract = '${fields.abstract}',  image = '${fields.image}',  pdf = '${fields.pdf}',  topics = '${fields.topics}',  tag = '${fields.tag}' WHERE id = ${id}`, (err, res) => {
        if(err){
            console.log("error", err);
            result(err, null)
            return;
        }

        result(null, res)
    })
}

Paper.deletePaper = (id, result) => {
    id = parseInt(id, 10);
    sql.query(`DELETE FROM paper WHERE id = ${id}`, (err, res) => {
        if(err){
            console.log("error", err);
            result(err, null)
            return;
        }

        result(null, res)
    })
}

module.exports = Paper;
