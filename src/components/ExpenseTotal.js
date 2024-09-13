import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
const ExpenseTotal = () => {
    const { expenses } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item)=> {return (total += item.cost)}, 0)
    return (
        <div className="alert alert-secondary">
            <span>Spent So Far: Rs {totalExpenses}</span>
        </div>
    )
}

export default ExpenseTotal
