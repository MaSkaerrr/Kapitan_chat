
import ChatList from '../ComponentPage/ChatList';
import Search from '../ComponentPage/Search';
import ChatArea from '../ComponentPage/ChatArea';
import SettingsList from '../ComponentPage/SettingsComp/SettingsList';
import  {useAuth}  from '../Provider/AuthProvider';
import { useState,useEffect,useMemo } from 'react';

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


  const chatSectionStyle = useMemo(() => ({
    display:'flex',gap:"10px",flexDirection:'column'
  }),[])

  const appcontstyle = useMemo(() => ({ padding: "20px", display: "flex",gap:"30px" }),[])

  const ProfileButtonStyle = useMemo(() => ({borderRadius:'50%',border:"5px solid rgba(237, 142, 0, 0)"}))
 
  return (
    <div className="app-container" style={appcontstyle}>

      {/* боковое меню с переченью чатов и кнопка настроек и поиск  */}
      <section  className="chat-list-sidebar" style={chatSectionStyle} >
        <div style={{border:"0px ", display:"flex", alignItems:"center",borderRadius:"40px"}}>
          <SettingsList isShow={show} setShow={setShow} >
              
          </SettingsList>
          
          <button style={ProfileButtonStyle} onDoubleClick={() => setShow(!show)}>
            <img src={"https://randomuser.me/api/portraits/men/41.jpg"} alt="profile photo" style={{borderRadius:"50%"}} width='50px' decoding='async' />
          </button>
          
          <Search chatList={chatList} />
        </div>
        <ChatList  chatList={chatList} setChatId={setChatId}/>
      </section>
      {/* содержимое чата */}
      <section>
        
        {chatId ?
        <ChatArea chatId={chatId} chat={chat}/>:

        <div className="empty-chat" style={{color:'white'}}>Select a chat</div>
        }
        
      </section>
    </div>
  );
}
