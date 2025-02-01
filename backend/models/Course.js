const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    modules: Number,
    duration: String,
    level: String,
    icon: String,
    topics: [String],
    prerequisites: String,
});

module.exports = mongoose.model('Course', courseSchema);