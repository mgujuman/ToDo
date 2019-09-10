
const List = require("../models/list.js");


exports.addToList = function(req, res){    
    console.log (req.body);
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const value = req.body.value;
    const color = req.body.color;
    const list = new List({id,value,color});
    
    list.save (function(err){
        if(err) return console.log(err);
    
    });
    res.send();
};

exports.deleteToList = function(req, res){
    console.log (req.body.id);
    List.deleteOne({id : `${req.body.id}`}, function(err, result){
              
        console.log(result);
    
    });
    res.send();
    
};

exports.editToList = function(req, res){
    masId = req.body;
    console.log (masId);

    for (let item of masId){
        List.updateOne({id : item.id}, {color : item.color}, function(err){
            if(err) return console.log(err);
        } )
    }
    res.send();
};

exports.viewToList = function(req, res){

    List.find({}, function(err, allList){
        if(err) {
            return res.sendStatus(400);
        }
        res.render("index.hbs", {
            list: allList
        });
    });
};