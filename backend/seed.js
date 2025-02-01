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