const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ItemSchema = new Schema({
    userID: String,
    author: String,
    id: String,
    title: String,
    desc: String,
    imageUrl: String,
    date: Object,
    likes: Number,
    likedBy: []
});

module.exports = mongoose.model('Item', ItemSchema);
