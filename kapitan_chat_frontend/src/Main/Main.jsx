
import ChatList from '../ComponentPage/ChatList';
import Search from '../ComponentPage/Search';
import ChatArea from '../ComponentPage/ChatArea';
import SettingsList from '../SettingsList';
import  {useAuth}  from '../Provider/AuthProvider';
import { useState,useContext } from 'react';

export default function Main() {
  // const isAuthenticated = localStorage.getItem("isAuthenticated");

  
  let {chatList} = useAuth();
  const [show, setShow] = useState(false);
  
 
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
        <ChatList  chatList={chatList}/>
      </section>
      <section>
        {/* {isInChat ? <div>Chat</div> : <div>Empty</div> } */}
        <ChatArea />
      </section>
    </div>
  );
}
