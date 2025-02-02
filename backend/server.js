require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Goal = require('./models/Goals');
const Course = require('./models/Course');
const Invest = require('./models/Invest');
const Retirement = require('./models/Retirement');


const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));


// Endpoint for the Learn page
app.get('/api/learn', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching courses', error: err });
    }
});

app.get('/api/goals', async (req, res) => {
    try {
        const goals = await Goal.find();
        res.json(goals);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching goals', error: err });
    }
});

// Endpoint for the Invest page
app.get('/api/invests', async (req, res) => {
    try {
        const investments = await Invest.find();
        res.json(investments);
    } catch (err) {
        console.error('Error fetching investments:', err);
        res.status(500).json({ message: 'Error fetching investments', error: err });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.post('/api/goals', async (req, res) => {
    try {
        const { name, target, current, category } = req.body;

        if (!name || !target || !current || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newGoal = new Goal({ name, target, current, category });
        await newGoal.save();

        res.status(201).json(newGoal);
    } catch (err) {
        res.status(500).json({ message: 'Error creating goal', error: err });
    }
});
app.delete('/api/goals/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedGoal = await Goal.findByIdAndDelete(id);
        if (!deletedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting goal', error: err });
    }
});

app.patch('/api/goals/:id/progress', async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        const goal = await Goal.findById(id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        goal.current += amount;
        await goal.save();

        res.status(200).json(goal);
    } catch (err) {
        res.status(500).json({ message: 'Error updating progress', error: err });
    }
});
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Endpoint to handle chat messages
app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ message: text });
    } catch (err) {
        console.error("Error generating response:", err);
        res.status(500).json({ message: "Error generating response", error: err });
    }
});

// GET endpoint to fetch retirement data
app.get("/api/retirement", async (req, res) => {
  try {
    const retirementData = await Retirement.findOne();
    if (!retirementData) {
      return res.status(404).json({ message: "Retirement data not found" });
    }
    res.status(200).json(retirementData);
  } catch (err) {
    res.status(500).json({ message: "Error fetching retirement data", error: err });
  }
});
