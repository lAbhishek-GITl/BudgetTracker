import { createContext, useReducer, useState, useEffect } from 'react';
import axios from 'axios';


// Reducer function to handle state changes based on dispatched actions
const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return {
                ...state,
                expenses: action.payload,   // Set expenses with the fetched data
            };
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],   // Add new expense to the existing list
            };
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense._id !== action.payload),   // Remove the expense with the given ID
            };
        default:
            return state;
    }
};

const initialState = {
    budget: 2000,
    expenses: []
};

// Create the application context
export const AppContext = createContext();

// Application context provider component
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState); // Use useReducer to manage state based on the reducer function and initial state
    const [searchQuery, setSearchQuery] = useState('');

    
    // Fetch expenses from the backend API when the component mounts
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/expenses');
                console.log('Fetched Expenses:', response.data); // Log the fetched data
                dispatch({ type: 'SET_EXPENSES', payload: response.data });
            } catch (error) {
                console.error('Error fetching expenses:', error);
                // Optionally, handle the error state here
            }
        };
        fetchExpenses();
    }, []);

    return (
        <AppContext.Provider value={{
            budget: state.budget,
            expenses: state.expenses,
            dispatch,
            searchQuery,
            setSearchQuery
        }}>
            {props.children}
        </AppContext.Provider>
    );
};
