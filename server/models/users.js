const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    userID: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    itemsPosted: { type: Number, default: 0}
});

module.exports = mongoose.model('User', UserSchema);
