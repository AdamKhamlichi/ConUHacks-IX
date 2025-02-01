require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Account = require('./models/MyMoney');
const Budget = require('./models/Budget');

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

app.use(cors());
app.use(express.json());

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define schemas and models
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

const goalSchema = new mongoose.Schema({
    name: String,
    target: Number,
    current: Number,
    category: String,
});

const Course = mongoose.model('Course', courseSchema);
const Goal = mongoose.model('Goal', goalSchema);

// Endpoint for the Learn page
app.get('/api/learn', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching courses', error: err });
    }
});

// Endpoint for the Goals page
app.get('/api/goals', async (req, res) => {
    try {
        const goals = await Goal.find();
        res.json(goals);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching goals', error: err });
    }
});

// Account endpoints
app.get('/api/accounts/:userId', async (req, res) => {
    try {
        const accounts = await Account.find({ userId: req.params.userId });
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching accounts', error: err });
    }
});

app.post('/api/accounts/transaction', async (req, res) => {
    try {
        const account = await Account.findById(req.body.accountId);
        const transaction = {
            type: req.body.type,
            amount: req.body.amount,
            description: req.body.description,
            category: req.body.category
        };
        
        // Update account balance
        if (transaction.type === 'credit') {
            account.balance += transaction.amount;
        } else {
            account.balance -= transaction.amount;
        }
        
        // Add transaction
        account.transactions.push(transaction);
        
        // Update monthly data
        const currentMonth = new Date();
        currentMonth.setDate(1);
        const monthlyData = {
            month: currentMonth,
            balance: account.balance
        };
        account.monthlyData.push(monthlyData);
        
        // Update budget if it's an expense
        if (transaction.type === 'debit') {
            const budget = await Budget.findOne({ 
                userId: account.userId,
                month: {
                    $gte: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
                    $lt: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
                }
            });
            
            if (budget) {
                const category = budget.categories.find(c => c.name === transaction.category);
                if (category) {
                    category.spent += transaction.amount;
                    await budget.save();
                }
            }
        }
        
        await account.save();
        
        // Create log
        const log = new Log({
            userId: account.userId,
            action: `${transaction.type === 'credit' ? 'Added' : 'Spent'} money`,
            category: transaction.category,
            amount: transaction.amount,
            description: transaction.description
        });
        await log.save();
        
        res.json(account);
    } catch (err) {
        res.status(500).json({ message: 'Error processing transaction', error: err });
    }
});

// Budget endpoints
app.get('/api/budget/:userId/current', async (req, res) => {
    try {
        const currentMonth = new Date();
        currentMonth.setDate(1);
        
        const budget = await Budget.findOne({
            userId: req.params.userId,
            month: {
                $gte: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
                $lt: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
            }
        });
        
        res.json(budget);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching budget', error: err });
    }
});

app.get('/api/budget/:userId/history', async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.params.userId })
            .sort({ month: -1 })
            .limit(12);
        res.json(budgets);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching budget history', error: err });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});