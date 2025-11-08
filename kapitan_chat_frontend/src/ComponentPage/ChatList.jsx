import { useState,useEffect } from "react";
import { useAuth } from "../Provider/AuthProvider";
export default function ChatList({chatList}) {
    return (
        <div className="chats-container">
            {chatList.map((chat) => (
                <div className={`chat-item${chat.active ? " active" : ""}`} key={chat.id}>
                    <div className="chat-avatar" >

                        {chat.img? <img src={chat.img} /> : <div>
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