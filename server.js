const express = require('express');
const router = require('./routes/router.js'); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/views/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);
app.use("/", router);
app.use((req, res, next) => {
  res.status(404).send("Not Found")
});

mongoose.connect('mongodb://localhost/base_title', { useNewUrlParser: true }, (err) => {
  if(err) return console.log(err);
  app.listen(3000);
});
