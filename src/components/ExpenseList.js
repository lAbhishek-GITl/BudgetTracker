import React, { useContext } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../contexts/AppContext';
import SearchFilter from './SearchFilter';

const ExpenseList = () => {
    const { expenses, searchQuery, setSearchQuery } = useContext(AppContext);

    const filteredExpenses = expenses.filter((expense) =>
        expense.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ul className='list-group'>
                {filteredExpenses.map((expense) => (
                    <ExpenseItem key={expense._id} id={expense._id} name={expense.name} cost={expense.cost} />
                ))}
            </ul>
        </>
    );
};

export default ExpenseList;
