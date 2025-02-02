const mongoose = require('mongoose');

const investSchema = new mongoose.Schema({
    month: String,
    stocks: Number,
    bonds: Number,
    crypto: Number
});

module.exports = mongoose.model('Invest', investSchema);