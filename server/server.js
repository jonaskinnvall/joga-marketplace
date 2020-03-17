const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');

require('dotenv').config({ path: 'secrets.env' });

// Importing models
let User = require('./models/users');
let Item = require('./models/items');

// Set port
const port = process.env.PORT || 3001;

// Create express instance
const app = express();

app.use(helmet());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Create router
// eslint-disable-next-line babel/new-cap
const router = express.Router();

// MongoDB database
let MongoDB = process.env.MONGODB_URI;

// Connect backend with database
mongoose.connect(MongoDB, {
    dbName: 'joga-db',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
let db = mongoose.connection;

db.once('open', () => console.log('Connected to DB!'));
db.on('error', console.error.bind(console, 'MongoDB connection error'));

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
    algorithms: ['RS256']
});

// USER ROUTES

//  Route to make changes, delete or retrieve specific users
router
    .route('/users/:id')
    .get((req, res) => {
        User.findOne({ userID: req.params.id }, (error, user) => {
            if (error)
                return res.status(500).send('Error retrieving user!', error);
            else if (!user)
                return res.status(404).send('User could not be found!');
            res.status(200).json(user);
        });
    })
    .put((req, res) => {
        // Update user with changes, found with userID
        User.findOneAndUpdate(
            { userID: req.params.id },
            req.body.userUpdate,
            { new: true },
            (error, updatedUser) => {
                if (error)
                    return res.status(500).send('Error updating user!', error);
                else if (!updatedUser)
                    return res.status(404).send('User could not be found!');
                res.status(200).json(updatedUser);
            }
        );
    })
    .delete((req, res) => {
        // Delete user based on userID
        User.findOneAndRemove(
            { userID: req.params.id },
            (error, removedUser) => {
                if (error)
                    return res.status(500).send('Error removing user!', error);
                else if (!removedUser)
                    return res.status(404).send('User could not be found!');
                res.status(200).json('Removed user!');
            }
        );
    });

router.route('/users').post((req, res) => {
    User.find({ userID: req.body.userID }, (error, id) => {
        // Create new user if it doesn't exist
        if (id == 0) {
            let user = new User({
                userID: req.body.userID,
                name: req.body.name,
                image: req.body.image
            });
            user.save(error => {
                if (error) return console.error(error);
                res.json({ body: user, message: 'User added!' });
            });
        } else res.json({ message: 'User already exists.' });
    });
});

// ITEM ROUTES

router
    .route('/items')
    // Get all posts
    .get((req, res) => {
        Item.find((error, items) => {
            res.json({ items });
        });
    })
    // Post an item
    .post(checkJwt, (req, res) => {
        let item = new Item({
            userID: req.body.userID,
            category: req.body.category,
            user: req.body.user,
            title: req.body.title,
            desc: req.body.desc,
            image: req.body.image
        });
        item.save(error => {
            if (error) return console.error(error);
            res.json({ body: item, message: 'Item added!' });
        });
    });

// TODO itemID routes
router
    .route('/items/:id')
    .get((req, res) => {})
    .put(checkJwt, (req, res) => {})
    .delete((req, res) => {});

//Route to ger items in specific category
router.route('/items/:category').get((req, res) => {
    Item.find({ category: req.body.category }, (error, items) => {
        if (error)
            return res.status(500).send('Error retrieving items!', error);
        else if (!items)
            return res
                .status(404)
                .send('Items could not be found with this category!');
        res.status(200).json(items);
    });
});

router
    .route('/private')
    .get(checkJwt, (req, res) => {
        res.send({ express: 'Hello Authorized Express!' });
    })
    .post(checkJwt, (req, res) => {
        res.send(
            `I received your POST request. This is what you sent me: ${req.body.post}`
            // 'I received your POST request.'
        );
    });

//Create a GET route
router.get('/hello', (req, res) => {
    res.send({ express: 'Hello Express!' });
});

//POST ENDPOINTS
// app.use(checkJwt);

//Create POST route

//Add author: req.user.name because of checkJwt!
// router.post('/private', checkJwt, (req, res) => {
//     console.log(req.body);

//     res.send(
//         `I received your POST request. This is what you sent me: ${req.body.post}`
//         // 'I received your POST request.'
//     );
// });

app.use('/api', router);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
