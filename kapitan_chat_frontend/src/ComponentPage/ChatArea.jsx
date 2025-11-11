import MessageInputArea from "./MessageInputArea";
import { useAuth } from "../Provider/AuthProvider";
import { useEffect, useState } from "react";
import Search from "./Search";


/**
 * компонент чата отвечающий за отображение чата
 */
export default function ChatArea({chatId,chat}) {

    const [messagelist, setMessagelist] = useState([]);
    const{me,MessageApi} = useAuth();
    const [loading, setLoading] = useState(true);
    const [isSerch, setIsSerch] = useState(false);

    useEffect(() => {
        if(!chat){
            setLoading(true)
        }

        else 
            setLoading(false);
        
    }, [chat,loading]);


    useEffect(() => {
        setMessagelist([]);
        MessageApi().getList(chatId).then((res) => setMessagelist(res));
    },[chatId])


    
    function GetListForSearch(){
        let list = [];

        messagelist.map(item => list.push({name:item.content,user:item.user.username}));

        return list;
    }

    
/**
 * функция аватра чата
 * если есть изображение, то отображает ее
 * если нет, то отображает имя чата
 * @return {ReactNode} отображение чата
 */
    function Avatar(){
        if (chat.img){
            return <img src={chat.img} />
        }
        else{
            return <div><h2>{chat.name.charAt(0).toUpperCase()+chat.name.charAt(chat.name.length-1).toLowerCase()}</h2></div>
        }
    }
    

/**
 * функция отображения аватара пользователя
 * если есть изображение, то отображает ее
 * если нет, то отображает имя пользователя
 * @param {object} user - объект с информацией о пользователе
 * @return {ReactNode} отображение аватара пользователя
 */ 
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
                 <div class="chat-header-area" style={{gap:'10px'}}>
                <div class="chat-user-info">
                    <div className="chat-user-avatar">{Avatar()}</div>
                    <div>
                        <div className="chat-user-name">{chat.name}</div>
                        {/* <div class="chat-user-status">online</div> */}
                    </div>
                </div>
                {isSerch && <Search chatList={GetListForSearch()}/>}
                <div class="chat-actions">
                    <button onClick={()=>setIsSerch(!isSerch)} class="icon-btn"> {isSerch ? <i class="fa-solid fa-xmark"></i>:<i class="fas fa-search"></i>} </button>
                    
                    <button class="icon-btn btn btn-danger"><i class="fas fa-ellipsis-v"></i></button>
                </div>
                
            </div>

            
            <div class="messages-container">
                
                {messagelist.map((item)=>{

                    return(
                        <div key={item.id} className={'message'+(item.user.id === me.id ? " sent" : " received")}>
                            <div className="message-avatar">{UserAvatar(item.user)}</div>
                            <div className="message-content">
                                <div className="message-text">{item.content}</div>
                                <div className="message-time">{item.created_at.slice(11,19)}</div>
                                </div>
                        </div>
                    )

                })}
                
                
            </div>
                </>}
            
            {/* <!-- Поле ввода сообщения --> */}
            <MessageInputArea setlist={setMessagelist} chatid={chatId} />
            </div>
        </div>
    );
}