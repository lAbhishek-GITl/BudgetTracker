const mongoose = require('mongoose');

// Define the schema for an expense
const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },

});


// Export the Expense model based on the expenseSchema
module.exports = mongoose.model('Expense', expenseSchema);
