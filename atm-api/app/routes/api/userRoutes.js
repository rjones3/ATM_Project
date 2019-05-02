const express = require("express");
const router = express.Router();

// controller here
const UserController = require("../../controller/userController");
const usercontroller = new 
UserController();

// user routes
router.get("/", function (req, res) {
    // do something
    usercontroller.findAll(res);
});

router.post('/create', function (req, res) {
    usercontroller.create(req, res);
});

router.put('/edit/:cardnum', function (req, res) {
    usercontroller.update(req, res);
});


module.exports = router;
