const express = require("express");
const controller = require("../controllers/controller.js");

const router = express.Router();

router.post('/deleteList', controller.deleteToList);
router.post('/editList', controller.editToList);
router.post('/addList', controller.addToList);
router.get('/', controller.viewToList);
router.get('/view', controller.viewToList);

module.exports = router;