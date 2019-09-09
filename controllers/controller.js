const List = require("../models/list.js");

exports.addToList = function(req, res){
    res.render('index.hbs');
    console.log (req.body);
    if(!req.body) return res.sendStatus(400);
    const title = req.body.title;
    const value = req.body.value;
    const color = req.body.color;
    const list = new List({id:title,value,color});
    
    list.save (function(err,res){
        if(err) return console.log(err);
        
        List.find({}, function(err, res){
  
            if(err) {
                console.log(err);
                return response.sendStatus(400);
            }
            console.log('res: ' + res);
               
        });
    });
};

exports.delToList = function(req, res){
    res.send("del");
};

exports.editToList = function(req, res){
    res.send("edit");
};

exports.viewToList = function(req, res){
    res.send("view");
};