// Load Modules
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./app/routes/router');

// Database Configuration
const database = require('./app/config/dbconfig');

// init Database
database.init();

// init server listening
const port = process.argv[2] || 3000;
app.listen(port, function () {
    console.log("Server listening on port: " + port);
});

// Express Configuration
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Router Configuration
app.use('/api', router);