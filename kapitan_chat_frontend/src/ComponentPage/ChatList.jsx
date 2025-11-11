
/**
 * Компонент для отображения списка чатов
 * 
 * @param {array} chatList - список чатов
 * @param {function} setChatId - функция для обновления идентификатора чата
 * 
 * @returns {React.Component} - компонент для отображения списка чатов
 */
export default function ChatList({chatList,setChatId}) {

    return (
        <div className="chats-container">
            {chatList.map((chat) => (
                <div className={`chat-item${chat.active ? " active" : ""}`} key={chat.id} onClick={()=>setChatId(chat.id)}>
                    <div className="chat-avatar" >

                        {chat.img? <img src={chat.img} decoding="async" /> : <div>
                            <h2>{chat.name.charAt(0).toUpperCase()+chat.name.charAt(chat.name.length-1).toLowerCase()}</h2></div>}
                        
                    
                    </div>
                    <div className="chat-header">
                        <div className="chat-name">{chat.name}</div>
                        
                    </div>
                    <div className="chat-preview">{chat.lastMessage}</div>
                    
                </div>
            ))}
        </div>
    );
}