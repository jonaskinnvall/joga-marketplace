const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var UserSchema = new Schema({
    userID: String,
    userItems: Number
});

module.exports = mongoose.model('User', UserSchema);
