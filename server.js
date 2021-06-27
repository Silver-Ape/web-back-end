const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sql = require("./config/db")
const app = express();

//Route files
const auth = require("./routes/auth.route");

// sql.connect(function(err) {
//     if (err) {
//       console.error('Database connection failed: ' + err.stack);
//       return;
//     }
  
//     console.log('Connected to database.');
//   });

// sql.end();

app.use(bodyParser.json());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get('/test',(req,res) => res.status(200).send(`Hello World`))

//Mount routes
app.use("/api/v1/auth", auth);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))