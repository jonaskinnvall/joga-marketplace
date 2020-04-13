const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const morgan = require('morgan');
const helmet = require('helmet');
// const fs = require('fs');
// TODO Fix so images can be added/uploaded to DB

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
    useFindAndModify: false,
});
let db = mongoose.connection;

db.once('open', () => console.log('Connected to DB!'));
db.on('error', console.error.bind(console, 'MongoDB connection error'));

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
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
        jwksUri: process.env.AUTH_JWKS,
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH_AUD,
    issuer: process.env.AUTH_DOMAIN,
    algorithms: ['RS256'],
});

// ----------USER ROUTES----------
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

router
    .route('/users')
    // Route to add user to DB if current user doesn't already exist
    .post((req, res) => {
        User.find({ userID: req.body.userID }, (error, id) => {
            // Create new user if it doesn't exist
            if (id == 0) {
                let user = new User({
                    userID: req.body.userID,
                    name: req.body.name,
                    image: req.body.image,
                });
                user.save((error) => {
                    if (error)
                        return res
                            .status(500)
                            .send('Error adding user!', error);
                    res.json({ body: user, message: 'User added!' });
                });
            } else res.json({ message: 'User already exists.' });
        });
    })
    // Route to update all users in DB if items are deleted
    .put((req, res) => {
        if (req.body.userUpdate.hasOwnProperty('nrItems')) {
            User.updateMany(
                {
                    $or: [
                        { nrItems: { $gt: 0 } },
                        { starredItems: { $not: { $size: 0 } } },
                    ],
                },
                {
                    $set: {
                        nrItems: req.body.userUpdate.nrItems,
                        postedItems: req.body.userUpdate.postedItems,
                        starredItems: req.body.userUpdate.starredItems,
                    },
                },
                (error, users) => {
                    if (error)
                        return res
                            .status(500)
                            .send('Error removing items from users!', error);
                    else if (users.nModified == 0)
                        return res
                            .status(404)
                            .send('No users that has posted or starred items!');

                    return res
                        .status(200)
                        .json('Removed all items from users!');
                }
            );
        } else {
            User.updateMany(
                {
                    starredItems: { $not: { $size: 0 } },
                },
                {
                    $pull: {
                        starredItems: { $in: req.body.userUpdate },
                    },
                },
                (error, users) => {
                    if (error)
                        return res
                            .status(500)
                            .send('Error removing items from users!', error);
                    else if (users.nModified == 0)
                        return res
                            .status(404)
                            .send('No users that has posted or starred items!');

                    return res
                        .status(200)
                        .json('Removed all starred items from users!');
                }
            );
        }
        res.status(500);
    });

// ----------ITEM ROUTES----------
// Route to add items and retrieve all items in DB
router
    .route('/items')
    .get((req, res) => {
        // Get all posts
        Item.find((error, items) => {
            res.json({ items });
        });
    })
    .post(checkJwt, (req, res) => {
        console.log(req.body);
        // Post an item
        let item = new Item({
            userID: req.body.userID,
            category: req.body.category,
            user: req.body.user,
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
            image: req.body.image,
        });
        item.save((error) => {
            if (error) return res.status(500).send('Error adding item!', error);
            res.json({ body: item, message: 'Item added!' });
        });
    })
    .delete((req, res) => {
        // Delete items that had been uploaded by deleted user
        if (Array.isArray(req.body) && req.body.length) {
            Item.deleteMany(
                { _id: { $in: req.body } },
                (error, removedItems) => {
                    if (error)
                        return res
                            .status(500)
                            .send('Error removing items!', error);
                    else if (!removedItems)
                        return res
                            .status(404)
                            .send('Items could not be found!');
                    res.status(200).json('Removed items!');
                }
            );
        } else {
            // Delete all items from collection
            Item.deleteMany((error, removedItems) => {
                if (error)
                    return res.status(500).send('Error removing items!', error);
                else if (!removedItems)
                    return res.status(404).send('Items could not be found!');
                res.status(200).json('Removed all items!');
            });
        }
    });

// Route to retrieve, update and delete items based on item's ID
router
    .route('/items/:_id')
    .get((req, res) => {
        // Retrieve item based on itemID
        Item.findById(req.params._id, (error, item) => {
            res.json({ item });
        });
    })
    .put(checkJwt, (req, res) => {
        // Update item based on itemID
        Item.findByIdAndUpdate(
            req.params._id,
            req.body.item,
            { new: true },
            (error, updatedItem) => {
                if (error) {
                    return res.status(500).send('Error updating item!', error);
                } else if (!updatedItem)
                    return res.status(404).send('Item could not be found!');
                res.status(200).json(updatedItem);
            }
        );
    })
    .delete(checkJwt, (req, res) => {
        // Delete item based on itemID
        Item.findByIdAndRemove(req.params._id, (error, removedItem) => {
            if (error)
                return res.status(500).send('Error removing item!', error);
            else if (!removedItem)
                return res.status(404).send('Item could not be found!');
            res.status(200).json('Removed item!');
        });
    });

app.use('/api', router);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
