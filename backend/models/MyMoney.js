const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: String,
    category: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    accountName: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true,
        enum: ['Checking', 'Savings', 'Investment', 'Credit Card']
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    transactions: [transactionSchema],
    monthlyData: [{
        month: Date,
        balance: Number
    }]
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema); 