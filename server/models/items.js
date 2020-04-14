const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ItemSchema = new Schema({
    userID: { type: String, required: true },
    category: { type: String, required: true },
    user: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    image: { data: Buffer, contentType: String },
    creationDate: { type: Date, default: Date.now },
    stars: { type: Number, default: 0 },
    starredBy: { type: [String] },
});

module.exports = mongoose.model('Item', ItemSchema);
