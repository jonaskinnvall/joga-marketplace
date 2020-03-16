const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ItemSchema = new Schema({
    userID: { type: String, required: true },
    id: { type: String, required: true },
    category: { type: String, required: true },
    owner: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    imageUrl: String,
    creationDate: { type: Date, default: Date.now },
    expirationDate: { type: Date, default: Date.now },
    stars: { type: Number, default: 0 },
    starredBy: { type: [String] }
});

module.exports = mongoose.model('Item', ItemSchema);
