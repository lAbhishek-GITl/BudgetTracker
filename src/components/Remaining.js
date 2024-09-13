import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

const Remaining = () => {
    const { expenses, budget } = useContext(AppContext);
    const TotalExpenses = expenses.reduce((total, item)=> {return (total = total + item.cost)}, 0)

    const alertType = TotalExpenses > budget ? 'alert-danger' : 'alert-success'

    return (
        <div className={`alert ${alertType}`}>
            <span>Remaining: Rs {budget - TotalExpenses }</span>
        </div>
    )
}

export default Remaining
