/* eslint-disable babel/camelcase */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const morgan = require('morgan');
const helmet = require('helmet');
const cloudinary = require('cloudinary').v2;

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
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));

// Set cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

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
// Route to add user and update multiple users
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
    // Route to update multiple users in DB if items are deleted
    .put(checkJwt, (req, res) => {
        if (req.body.updateDB.hasOwnProperty('nrItems')) {
            User.updateMany(
                {
                    $or: [
                        { nrItems: { $gt: 0 } },
                        { starredItems: { $not: { $size: 0 } } },
                    ],
                },
                {
                    $set: {
                        nrItems: req.body.updateDB.nrItems,
                        postedItems: req.body.updateDB.postedItems,
                        starredItems: req.body.updateDB.starredItems,
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
                    starredItems: { $in: req.body.updateDB },
                },
                {
                    $pull: {
                        starredItems: { $in: req.body.updateDB },
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
                            .send('No users that has starred those items!');

                    return res
                        .status(200)
                        .json('Removed all starred items from users!');
                }
            );
        }
        res.status(500);
    });

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
    .put(checkJwt, (req, res) => {
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
    .delete(checkJwt, (req, res) => {
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

// ----------ITEM ROUTES----------
// Route to add items, edit and delete multiple items and retrieve all items in DB
router
    .route('/items')
    .get((req, res) => {
        // Get all posts
        Item.find((error, items) => {
            res.json({ items });
        });
    })
    .post(checkJwt, (req, res) => {
        // Post an item
        let item = new Item({
            userID: req.body.userID,
            category: req.body.category,
            user: req.body.user,
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
            image: {
                imageURL: req.body.image.imageURL,
                imageID: req.body.image.imageID,
            },
        });

        item.save((error) => {
            if (error) return res.status(500).send(error);
            res.json({ body: item, message: 'Item added!' });
        });
    })
    // Route to update many items in DB if user is deleted
    .put(checkJwt, (req, res) => {
        Item.updateMany(
            {
                starredBy: { $in: req.body.user.userID },
            },
            {
                $inc: { stars: -1 },
                $pull: {
                    starredBy: { $in: req.body.user.userID },
                },
            },
            (error, users) => {
                if (error)
                    return res
                        .status(500)
                        .send('Error removing user from items!', error);
                else if (users.nModified == 0)
                    return res
                        .status(404)
                        .send('Users has not starred any items!');

                return res
                    .status(200)
                    .json('Removed user from items starredBy!');
            }
        );
    })
    .delete((req, res) => {
        // Delete multiple items that had been uploaded by user
        // who wants to remove them or has deleted their profile
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

// Route to retrieve, update and delete specific items based on item's ID
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

// ----------IMAGE ROUTES----------
// Route to upload image to Cloudinary and
// return URL and public_id of image to be stored in DB
router.route('/image-upload').post(checkJwt, (req, res) => {
    const reqImage = req.body.image;
    return cloudinary.uploader.upload(
        reqImage,
        { folder: req.body.folder, tags: [req.body.user] },
        (error, result) => {
            const imageURL = result.secure_url;
            const imageID = result.public_id;

            return res.status(200).json({ imageURL, imageID });
        }
    );
});

// Route to delete images from Cloudinary,
// either one image or multiple images uploaded by same user
router.route('/image-delete').put(checkJwt, (req, res) => {
    if (req.body.image) {
        const toDelete = req.body.image;
        return cloudinary.uploader.destroy(toDelete, (error, result) => {
            return res.status(200);
        });
    } else {
        const toDelete = req.body.user;
        return cloudinary.api.delete_resources_by_tag(
            toDelete,
            (error, result) => {
                return res.status(200);
            }
        );
    }
});

app.use('/api', router);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
