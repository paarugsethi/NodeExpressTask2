const express = require('express');
const app = express();
let Authors = require("./api/books/Authors.json");
var bodyParser = require('body-parser')
const bookRouter = require("./api/books/books")
const cors = require('cors');

const port = 4000;
const logger1 = require('./middlewares/logger')
const timeLogger = require('./middlewares/timeLogger');

app.use(bodyParser.json())
app.use(logger1);
app.use(timeLogger);
app.use(cors());

app.get("", (req, res) => {
    res.json(Authors)
})

app.use("/", bookRouter);

app.listen(port, () => {
    console.log("Listening to 4000");
})