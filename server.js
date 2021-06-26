const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sql = require("./config/db")
const app = express();

sql.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
  });

sql.end();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get('/test',(req,res) => res.status(200).send(`Hello World`))


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))