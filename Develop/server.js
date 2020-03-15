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
app.use(express.static("public"));

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    let rawdata = fs.readFileSync(path.join(__dirname, '/db/db.json'));
    let notes = JSON.parse(rawdata);
    for (let index = 0; index < notes.length; index++){
        notes[index].id = index;
    }
    console.log(notes);
    return res.json(notes);
});

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    let rawdata = fs.readFileSync(path.join(__dirname, '/db/db.json'));
    let notes = JSON.parse(rawdata);
    
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'),JSON.stringify(notes));
});

app.delete("/api/notes/:id", function (req, res) {
   var remove = req.params.id;
   let rawdata = fs.readFileSync(path.join(__dirname, '/db/db.json'));
   let notes = JSON.parse(rawdata);
   
   notes.splice(remove,1);
   fs.writeFileSync(path.join(__dirname, '/db/db.json'),JSON.stringify(notes));

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});