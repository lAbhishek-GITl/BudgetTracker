import React, { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppContext'

const Budget = () => {
    const {budget, dispatch} = useContext(AppContext);
    const [editable, setEditable] = useState(false);
    const [newBudget, setNewBudget] = useState(budget);

    const handleEdit = () => {
        setEditable(true);
    };

    const handleSave = () => {
        dispatch({ type: 'UPDATE_BUDGET', payload: newBudget });
        setEditable(false);
    };

    const handleCancel = () => {
        setNewBudget(budget);
        setEditable(false);
    };

    const handleChange = (e) => {
        setNewBudget(parseInt(e.target.value) || 0);
    };

    return (
        <div className="alert alert-secondary">
            {editable ? (
                <div>
                    <input type="number" value={newBudget} onChange={handleChange} />
                    <button className="btn btn-primary mx-2" onClick={handleSave}> Save </button>
                    <button className="btn btn-secondary mx-2" onClick={handleCancel}> Cancel </button>
                </div>
            ) : (
                <div>
                    <span>Budget: Rs {budget}</span>
                    <button className="btn btn-sm btn-outline-primary ml-2 mx-2" onClick={handleEdit}>
                    <i className="fas fa-pencil-alt"></i> Edit </button>

                </div>
            )}
        </div>
    );
}

export default Budget
