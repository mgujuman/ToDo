const express = require("express");
const controller = require("../controllers/controller.js");

const router = express.Router();
const jsonParser = express.json();

router.post('/',jsonParser, controller.viewToList);
router.post('/del',jsonParser, controller.delToList);
router.post('/edit',jsonParser, controller.editToList);
router.post('/add',jsonParser, controller.addToList);
router.get('/add',controller.addToList);

module.exports = router;