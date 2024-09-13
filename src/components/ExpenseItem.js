import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { TiDelete } from 'react-icons/ti';
import axios from 'axios';

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);

    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/api/expenses/${props.id}`);

        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id
        });
    };

    return (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
            {props.name}

            <span className="badge bg-primary rounded-pill mr-3">
                Rs {props.cost}
            </span>

            <TiDelete size='1.5rem' onClick={handleDelete}></TiDelete>
        </li>
    );
};

export default ExpenseItem;
