// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require('fs');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3333;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    //let rawdata = fs.readFileSync('/db/db.json');
    // console.log(rawdata);
    // return res.json(rawdata);
});

app.post("/api/notes", function (req, res) {
   
});

app.delete("/api/notes/", function (req, res) {
   
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});