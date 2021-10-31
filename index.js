require("dotenv").config();
require("./config/db").connect();
const PORT = process.env.PORT || 8080;
const apiAuthor = require("./config/apiAuthor");
const bodyParser = require("body-parser");
const route = require("./routes");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

route(app);

app.use((req, res, next) => {
    const err = new Error("404 Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message || "Server internal error",
        APIs_author: apiAuthor,
    });
});

app.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});
