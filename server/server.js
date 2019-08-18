const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const logger = require('morgan');
const helmet = require('helmet');

require('dotenv').config({ path: 'secrets.env' });

// Importing models
var User = require('./models/users');
var Item = require('./models/items');

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

db.once('open', () => console.log('Connected to DB!'));
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT,DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );

    //Remove caching so we get the most recent posts
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH_JWKS
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH_AUD,
    issuer: process.env.AUTH_DOMAIN,
    algorithms: [process.env.AUTH_ALGO]
});

//GET ENDPOINTS

//Create a GET route
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello Express!' });
});

// //Create a SECURED GET route
// app.get('/api/helloSec', checkJwt, (req, res) => {
//     res.send({express: 'And your access token was validated!'});
// });

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!' });
});

// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function(
//         err
//     ) {
//         if (err) {
//             res.status(500).send(err);
//         }
//     });
// });

//POST ENDPOINTS

//Create POST route
//Add author: req.user.name because of checkJwt!
app.post('/api/world', checkJwt, (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${
            req.body.post
        }`
    );
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
