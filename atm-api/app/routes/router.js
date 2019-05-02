const express = require("express");
const router = express.Router();

// api routes

router.use("/user", require("./api/userRoutes"));

// add more api here

module.exports = router;

