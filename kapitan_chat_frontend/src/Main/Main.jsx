import React from 'react';
import ChatList from '../ComponentPage/ChatList';
import Search from '../ComponentPage/Search';
import  {useAuth}  from '../Provider/AuthProvider';
import { useState,useContext } from 'react';
export default function Main() {
  // const isAuthenticated = localStorage.getItem("isAuthenticated");

  
  let {chatList} = useAuth();

  const [isInChat, setIsInChat] = useState(false);
 
  return (
    <div className="container" style={{ padding: "20px", display: "flex" }}>
      <section style={{backgroundColor:'blue'}}>
        <div style={{border:"0px ", display:"flex", alignItems:"center"}}>
          <button>
            <img src={"https://randomuser.me/api/portraits/men/41.jpg"} alt="profile photo" style={{borderRadius:"50%"}} width='50px' />
            
          </button>
          <Search chatList={chatList} />
        </div>
        <ChatList  chatList={chatList}/>
      </section>
      <section>
        {isInChat ? <div>Chat</div> : <div>Empty</div> }
      </section>
    </div>
  );
}
