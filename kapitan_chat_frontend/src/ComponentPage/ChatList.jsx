import { useState,useEffect } from "react";
export default function ChatList({chatList}) {
    
    


    return (
        <div>
            {chatList.map((chat) => (
                <div>
                    <div style={{alignItems:"center",display:"flex"}}>
                        <img src={chat.img} style={{width:'30px'}}/>
                    <div>{chat.name}</div>
                    </div>
                    <br />
                    <div>{chat.lastMessage}</div>
                </div>
            ))}
        </div>
    );
}