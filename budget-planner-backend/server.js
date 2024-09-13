// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Expense = require('./models/Expense'); // Import the Expense model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());  // Parse incoming JSON requests
app.use(cors());    // Enable CORS for cross-origin requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Budget-Planner', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));



// Routes



// Get all expenses
app.get('/api/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find();  // Retrieve all expenses from the database
        res.json(expenses); // Send the expenses as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Add a new expense
app.post('/api/expenses', async (req, res) => {
    try {
        const { name, cost } = req.body;

        // Validate input
        if (!name || isNaN(cost) || parseInt(cost) <= 0) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        // Ensure cost is an integer
        const costValue = parseInt(cost);

        // Create and save new expense
        const newExpense = new Expense({
            name,
            cost: costValue
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error adding expense:', error.message); // Log error for debugging
        // Provide a more specific error message if needed
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Delete an expense by ID
app.delete('/api/expenses/:id', async (req, res) => {
    try {
        const result = await Expense.findByIdAndDelete(req.params.id);
        if (result) {
            res.json({ message: 'Expense deleted' });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// Update an expense by ID
app.put('/api/expenses/:id', async (req, res) => {
    try {
        const { name, cost } = req.body;

        // Validate input
        if (!name || isNaN(cost) || parseInt(cost) <= 0) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { name, cost: parseInt(cost) },
            { new: true }   // Return the updated document
        );

        if (updatedExpense) {
            res.json(updatedExpense);   // Send the updated expense as a JSON response
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
