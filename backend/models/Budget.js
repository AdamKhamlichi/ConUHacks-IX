const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    spent: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
        default: '#0088FE'
    }
});

const budgetSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    month: {
        type: Date,
        required: true
    },
    totalBudget: {
        type: Number,
        required: true
    },
    categories: [categorySchema],
    monthlyHistory: [{
        month: Date,
        spent: Number,
        budget: Number
    }]
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema); 