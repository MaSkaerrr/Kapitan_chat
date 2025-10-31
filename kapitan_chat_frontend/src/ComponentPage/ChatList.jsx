import { useState,useEffect } from "react";
export default function ChatList({chatList}) {
    
    let i = 0

    return (
        <div className="chats-container">
            {chatList.map((chat) => (
                <div className={`chat-item${chat.active ? " active" : ""}`} key={chat.userId}>
                    <div className="chat-avatar" >
                        <img src={chat.img} />
                    
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