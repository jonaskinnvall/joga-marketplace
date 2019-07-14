const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const logger = require("morgan");
const helmet = require("helmet");

require("dotenv").config({ path: "secrets.env" });

// Importing models
var User = require("./models/users");

// Set port
const port = process.env.PORT || 3001;

// Create express instance
const app = express();
app.use(cors());

// Create router
const router = express.Router();

// MongoDB database
var MongoDB = process.env.MONGODB_URI;

// Connect backend with database
mongoose.connect(MongoDB, { useNewUrlParser: true });
var db = mongoose.connection;

db.once("open", () => console.log("Connected to DB!"));
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));

//GET ENDPOINTS

//Create a GET route
app.get("/api/hello", (req, res) => {
    res.send({ express: "Hello Express!" });
});

// app.get("/api/getUsername", (req, res) =>
//     res.send({ username: os.userInfo().username })
// );

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://jonaskinnvall.eu.auth0.com/.well-known/jwks.json"
    }),

    // Validate the audience and the issuer.
    audience: "58axYvh5bZ5gW8n88k4VNKdStKlISkDc",
    issuer: "https://jonaskinnvall.eu.auth0.com/",
    algorithms: ["RS256"]
});

//POST ENDPOINTS

//Create POST route
//Add author: req.user.name because of checkJwt!
app.post("/api/world", checkJwt, (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${
            req.body.post
        }`
    );
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
