import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCardContext } from '../../Provider/Provider/CardProvider';

const Card = () => {
    const context = useCardContext();
    const data = context.mass;
    const openModal = context.handleEditClick;
    const checkboxChange = context.onCheckboxChange;
    const handleDeleteClick = context.handleDeleteClick; // Получаем функцию удаления

    return (
        <>
            <ul className="list-group list-group-flush">
                {data.map(item => (
                    <li key={item.id} className="list-group-item d-flex align-items-center justify-content-between mt-0.75">
                        <div className="d-flex align-items-center">
                            <input 
                                type='checkbox' 
                                className="form-check-input" 
                                checked={item.completed} 
                                onChange={() => checkboxChange(item.id)} 
                                style={{ marginRight: '20px' }} 
                            />
                            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.title}</span>
                        </div>
                        <div>
                        <button 
                                type="button" 
                                className="btn btn-danger" 
                                onClick={() => handleDeleteClick(item.id)} // Удаляем элемент
                            >
                                Delete
                        </button>
                            <button 
                                type="button" 
                                className="btn btn-warning me-2" 
                                onClick={() => openModal(item)}
                            >
                                Edit
                            </button>
                           
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Card;