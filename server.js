const express = require('express');
const app = express();
const router = require('./routes/router.js') 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.set("view engine", "hbs");

app.use(express.static(__dirname + "/views/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);
app.use('/',router);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

mongoose.connect('mongodb://localhost/base_title', { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
    });
});