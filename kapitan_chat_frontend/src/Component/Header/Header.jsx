import React, { useContext } from "react";
import { AddModalContext } from "../../Provider/Provider/AddModalProvider";

export default function Header() {
    const { Open,inputRef } = AddModalContext();

  

    return (
        <>
            <h1>Awesome Todo List</h1>
            <form className="d-flex-inline">
                <label htmlFor="todoInput" className="form-label">What do you need to do today?</label>
                <div className="d-flex form-group me-2">
                    <input 
                        ref={inputRef}
                        type="text" 
                        className="form-control"
                        style={{ width: '100%' }}  
                        id="todoInput" 
                        placeholder="Enter your todo" 
                    />
                    <button onClick={Open} className="btn btn-primary" style={{ width: '5%', height: '5%', marginLeft: '0.75rem' }}>Add</button>
                </div>
            </form>
        </>
    );
}