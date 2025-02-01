require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});