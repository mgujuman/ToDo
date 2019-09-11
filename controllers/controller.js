const List = require("../models/list.js");

exports.addToList = (req, res) => {    
  if(!req.body) return res.sendStatus(400);
  const { id, value, color } = req.body;
  const list = new List({ id, value, color });
  list.save ((err) => { if (err) return  console.log(err)});
  res.send();
};

exports.deleteToList = (req, res) => {
  List.deleteOne({ id: `${req.body.id}` }, (err) => { 
    if (err) return  console.log(err)
  });

  res.send();
};

exports.editToList = (req, res) => {
  req.body.forEach( (item ) => {
    let { id, color } = item;
    List.updateOne({ id }, { color }, (err) => { 
      if (err) return  console.log(err)
    });
  });

  res.send();
};

exports.viewToList = (req, res) => {
  List.find({}, (err, list) => {
    if(err)  return res.sendStatus(400);
    res.render("index.hbs", {
      list,
    });
  });
};
