// Require dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// Declare the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Declare the database
const questions = [
    {
        id: 1,
        title: "How do I make a sandwich?",
        description: "I am trying very hard, but I do not know how to make a delicious sandwich. Can someone help me?",
        answers: []
    },
    {
        id: 2,
        title: "What is React?",
        description: "I have been hearing a lot about React. What is it?",
        answers: []
    }
];

// Enhance app security with Helmet
app.use(helmet());

// Use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// Enable all CORS requests
app.use(cors());

// Log HTTP requests
app.use(logger("combined"));

// Route to GET all questions
app.get("/", (req, res) => {
    const qs = questions.map(q => ({
        id: q.id,
        title: q.title,
        description: q.description,
        answers: q.answers.length
    }));
    res.send(qs);
});

// Route to GET a specific question
app.get("/:id", (req, res) => {
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();
    res.send(question[0]);
});

// Configure Auth0 middleware
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://joseph526.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer
    audience: "Laa1cOI7lMsoUe9z3ii3eHHGIR5ki4zd",
    issuer: `https://joseph526.auth0.com/`,
    algorithms: ["RS256"]
});

// Route to POST a new question
app.post("/", checkJwt, (req, res) => {
    const {title, description} = req.body;
    const newQuestion = {
        id: questions.length + 1,
        title,
        description,
        answers: [],
        author: req.user.name
    };
    questions.push(newQuestion);
    res.status(200).send();
});

// Route to POST a new answer to a question
app.post("/answer/:id", checkJwt, (req, res) => {
    const {answer} = req.body;
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();
    question[0].answers.push({
        answer,
        author: req.user.name
    });
    res.status(200).send();
});

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
