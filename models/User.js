const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: { type: String, enum: ['user','editor','manager'], default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);