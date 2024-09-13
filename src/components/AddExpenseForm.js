import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import axios from 'axios';

const AddExpenseForm = () => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const { dispatch } = useContext(AppContext);

    // Handler for form submission
    const onSubmit = async (event) => {
        event.preventDefault();

        // Validate cost is a positive integer
        if (cost.trim() === '' || isNaN(cost) || parseInt(cost) <= 0) {
            alert('Please enter a valid positive integer for the cost.');
            return;
        }

        const expense = {
            name,
            cost: parseInt(cost)    // Ensure cost is an integer
        };

        try {
            const response = await axios.post('http://localhost:5000/api/expenses', expense);

            // Dispatch action to add new expense to the context
            dispatch({
                type: 'ADD_EXPENSE',
                payload: response.data
            });

            // Clear the input fields
            setName('');
            setCost('');
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('There was a problem adding the expense.');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className='col-sm'>
                <label htmlFor="name">Name</label>
                <input
                    required
                    type="text"
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>

            <div className='col-sm'>
                <label htmlFor="cost">Cost</label>
                <input
                    required
                    type="number"
                    className='form-control'
                    id='cost'
                    value={cost}
                    onChange={(event) => setCost(event.target.value)}
                    min="1"
                />
            </div>

            <div className='col-sm mt-2'>
                <button type='submit' className='btn btn-primary'>Save</button>
            </div>
        </form>
    );
};

export default AddExpenseForm;
