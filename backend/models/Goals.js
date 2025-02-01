const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    name: String,
    target: Number,
    current: Number,
    category: String,
});

module.exports = mongoose.model('Goal', goalSchema);