require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const dblink = process.env.MONGOLAB_URL;
mongoose.connect(dblink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Entry = mongoose.model("Entry", { id: Number, lname: String });

// const newEntry = new Entry({ id: 1234, lname: "vishwa" });
// newEntry.save().then(() => console.log("entered"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/add", function (req, res) {
  res.sendFile(__dirname + "/add.html");
});

app.post("/add", function (req, res) {
  const entry = new Entry({
    id: req.body.id,
    lname: req.body.lname,
  });
  entry.save(function (err) {
    if (!err) {
      res.redirect("/add");
    }
  });
});
app.post("/", function (req, res) {
  let id = req.body.id;
  let lname = req.body.lname;
  Entry.findOne({ id: id, lname: lname }, function (err, founduser) {
    if (founduser) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.listen(port, () => console.log(`Server started at port: ${port}`));
