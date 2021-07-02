const express = require('express');
const bodyParser = require('body-parser');
const cookieParaer = require('cookie-parser');
const errorHandler = require('./middleware/error');
require('dotenv').config();
const sql = require("./config/db")
const cors = require('cors')
const app = express();

//Route files
const auth = require("./routes/auth.route");
const paper = require("./routes/paper.route");
const author = require("./routes/author.route")

// sql.connect(function(err) {
//     if (err) {
//       console.error('Database connection failed: ' + err.stack);
//       return;
//     }

//     console.log('Connected to database.');
//   });

// sql.end();

app.use(bodyParser.json());

//Cookie parser
app.use(cookieParaer());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// We need CORS for HTTP requests to work across servers.
app.use(cors())

const PORT = process.env.PORT || 5000;

app.get('/test',(req,res) => res.status(200).send(`Hello World`))

//Mount routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/author", author);
app.use("/api/v1/paper", paper);

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
