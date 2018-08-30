// Require dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

// Declare the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Declare the database
const questions = [];

// Enhance app security with Helmet
app.use(helmet());

// Use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// Enable all CORS requests
app.use(cors());

// Log HTTP requests
app.use(logger("combined"));

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
