const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    creationDate: { type: Date, default: Date.now },
    nrItems: { type: Number, default: 0 },
    postedItems: { type: [String] },
    starredItems: { type: [String] },
    favCat: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
