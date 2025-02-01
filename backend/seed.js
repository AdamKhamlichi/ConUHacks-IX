require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const Course = require('./models/Course'); // Correct path to Course model
const Goal = require('./models/Goals'); // Correct path to Goal model

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB for seeding'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

const seedCourses = [
    {
        title: "Financial Basics",
        description: "Learn the fundamentals of personal finance",
        modules: 5,
        duration: "2 hours",
        level: "Beginner",
        icon: "BookOpen",
        topics: [
            "Understanding Income and Expenses",
            "Basic Banking Concepts",
            "Introduction to Savings",
            "Managing Your Money",
            "Financial Goal Setting"
        ],
        prerequisites: "None"
    },
    {
        title: "Investment 101",
        description: "Understanding different investment options",
        modules: 8,
        duration: "4 hours",
        level: "Intermediate",
        icon: "TrendingUp",
        topics: [
            "Types of Investments",
            "Risk and Return",
            "Portfolio Diversification",
            "Market Analysis Basics",
            "Investment Strategies"
        ],
        prerequisites: "Financial Basics"
    },
    {
        title: "Budgeting Mastery",
        description: "Master the art of budgeting and saving",
        modules: 6,
        duration: "3 hours",
        level: "Beginner",
        icon: "PiggyBank",
        topics: [
            "Creating a Budget",
            "Tracking Expenses",
            "Saving Strategies",
            "Debt Management",
            "Emergency Funds"
        ],
        prerequisites: "None"
    },
    {
        title: "Risk Management",
        description: "Learn about insurance and protecting assets",
        modules: 7,
        duration: "3.5 hours",
        level: "Advanced",
        icon: "Shield",
        topics: [
            "Types of Insurance",
            "Asset Protection",
            "Estate Planning Basics",
            "Risk Assessment",
            "Emergency Planning"
        ],
        prerequisites: "Financial Basics, Investment 101"
    },
];

const seedGoals = [
    { name: "Emergency Fund", target: 10000, current: 6000, category: "Savings" },
    { name: "New Car", target: 25000, current: 5000, category: "Purchase" },
    { name: "House Down Payment", target: 50000, current: 15000, category: "Property" },
    { name: "Vacation", target: 5000, current: 2500, category: "Travel" }
];

const seedAccounts = [
    {
        userId: "user123",
        accountName: "Main Checking",
        accountType: "Checking",
        balance: 5000,
        transactions: [
            {
                type: "debit",
                amount: 1500,
                description: "Rent payment",
                category: "Housing",
                date: new Date()
            },
            {
                type: "credit",
                amount: 3000,
                description: "Salary deposit",
                category: "Income",
                date: new Date()
            }
        ],
        monthlyData: [
            {
                month: new Date(new Date().setDate(1)),
                balance: 5000
            }
        ]
    }
];

const seedBudget = {
    userId: "user123",
    month: new Date(new Date().setDate(1)),
    totalBudget: 5000,
    categories: [
        { name: "Housing", limit: 2000, spent: 1500, color: "#0088FE" },
        { name: "Food", limit: 800, spent: 400, color: "#00C49F" },
        { name: "Transportation", limit: 400, spent: 200, color: "#FFBB28" },
        { name: "Entertainment", limit: 300, spent: 150, color: "#FF8042" }
    ],
    monthlyHistory: [
        {
            month: new Date(new Date().setDate(1)),
            spent: 2250,
            budget: 5000
        }
    ]
};

const seedDatabase = async () => {
    try {
        await Course.deleteMany({});
        await Goal.deleteMany({});

        await Course.insertMany(seedCourses);
        await Goal.insertMany(seedGoals);

        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.disconnect();
    }
};

seedDatabase();