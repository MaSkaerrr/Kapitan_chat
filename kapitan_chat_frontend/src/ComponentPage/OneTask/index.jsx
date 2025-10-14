import { useState } from "react";
const OneTask = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <>
        <h1 style={{justifySelf:"center"}}>Only one Task</h1>
        <div>
            <p><strong>ОПИС: </strong> По кліку буде добавлятися кількість кліків</p>
            
            <button onClick={handleClick}>Кликни меня</button>
            <p>Количество кликов: {count}</p>
        </div>
        </>
    );
};

export default OneTask;