
import ChatList from '../ComponentPage/ChatList';
import Search from '../ComponentPage/Search';
import ChatArea from '../ComponentPage/ChatArea';
import SettingsList from '../ComponentPage/SettingsComp/SettingsList';
import  {useAuth}  from '../Provider/AuthProvider';
import { useState,useEffect } from 'react';

export default function Main() {
  // const isAuthenticated = localStorage.getItem("isAuthenticated");

  
  let {chatList,setChatList} = useAuth();
  const [show, setShow] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [chat, setChat] = useState(null);
  
  useEffect(() => {
    console.log('chatId',chatId);
    setChatList((chatList) => chatList.map((chat) => ({ ...chat, active: chat.id === chatId })));
    setChat(chatList.find((chat) => chat.id === chatId));
    console.log('chat',chatList);
  }, [chatId]);
 
  return (
    <div className="app-container" style={{ padding: "20px", display: "flex",gap:"30px" }}>
      <section  className="chat-list-sidebar" style={{display:'flex',gap:"10px",flexDirection:'column'}} >
        <div style={{border:"0px ", display:"flex", alignItems:"center",borderRadius:"40px"}}>
          <SettingsList isShow={show} setShow={setShow} >
              
          </SettingsList>
          
          <button style={{borderRadius:'50%',border:"5px solid rgba(237, 142, 0, 0)"}} onDoubleClick={() => setShow(!show)}>
            <img src={"https://randomuser.me/api/portraits/men/41.jpg"} alt="profile photo" style={{borderRadius:"50%"}} width='50px' />
          </button>
          
          <Search chatList={chatList} />
        </div>
        <ChatList  chatList={chatList} setChatId={setChatId}/>
      </section>
      <section>
        {/* {isInChat ? <div>Chat</div> : <div>Empty</div> } */}
        {chatId ?
        <ChatArea chatId={chatId} chat={chat}/>:

        <div className="empty-chat" style={{color:'white'}}>Select a chat</div>
        }
        
      </section>
    </div>
  );
}
