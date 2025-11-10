import MessageInputArea from "./MessageInputArea";
import { useAuth } from "../Provider/AuthProvider";
import { useEffect, useState } from "react";
import { use } from "react";
export default function ChatArea({chatId,chat}) {

    const [messagelist, setMessagelist] = useState([]);

    const{me,UserApi} = useAuth();

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if(!chat){
            setLoading(true)
        }

        else 
            setLoading(false);
        
    }, [chat,loading]);


    useEffect(() => {
        setMessagelist([]);
    },[chatId])



    //временный юз 
    useEffect(() => {
        console.log(messagelist)
    }, [messagelist]);
    
    function Avatar(){
        if (chat.img){
            return <img src={chat.img} />
        }
        else{
            return <div><h2>{chat.name.charAt(0).toUpperCase()+chat.name.charAt(chat.name.length-1).toLowerCase()}</h2></div>
        }
    }

    function UserAvatar(user){
        if (user.img){
            return <img src={user.img} />
        }
        else{
            return <div><p>{user.username.charAt(0).toUpperCase()+user.username.charAt(user.username.length-1).toLowerCase()}</p></div>
        }
    }

    return (
        
        <div>
            <div className="sidebar-overlay" id="sidebarOverlay"></div>
            <div class="chat-area">

                {loading ? (
                    <h1>LOAD</h1>
                ):
                <>
                 <div class="chat-header-area">
                <div class="chat-user-info">
                    <div className="chat-user-avatar">{Avatar()}</div>
                    <div>
                        <div className="chat-user-name">{chat.name}</div>
                        {/* <div class="chat-user-status">online</div> */}
                    </div>
                </div>
                <div class="chat-actions">
                    <button class="icon-btn"><i class="fas fa-search"></i></button>
                    <button class="icon-btn"><i class="fas fa-ellipsis-v"></i></button>
                </div>
            </div>

            {/* <!-- Область сообщений --> */}
            <div class="messages-container">
                <div class="message received">
                    <div class="message-avatar ">AS</div>
                    <div class="message-content">
                        <div class="message-text">I had science and creative careers, but I decided to read it in story?</div>
                        <div class="message-time">12:40</div>
                    </div>
                </div>
                
                <div class="message sent">
                    <div class="message-avatar">JD</div>
                    <div class="message-content">
                        <div class="message-text">You answered more.</div>
                        <div class="message-time">12:41</div>
                    </div>
                </div>


                {messagelist.map((item)=>{

                    return(
                        <div className={'message'+(item.user.id === me.id ? " sent" : " received")}>
                            <div className="message-avatar">{UserAvatar(item.user)}</div>
                            <div className="message-content">
                                <div className="message-text">{item.content}</div>
                                <div className="message-time">{item.created_at.slice(11,19)}</div>
                                </div>
                        </div>
                    )

                })}
                
                
            </div>
                </>
                }
           

            {/* <!-- Поле ввода сообщения --> */}
            <MessageInputArea setlist={setMessagelist} chatid={chatId} />
        </div>
        </div>
    );
}